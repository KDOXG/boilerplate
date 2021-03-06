class ObjectModel
{
    constructor(param)
    {
        this.param = param;
        this.gui = setNewObjectGUI(param);
        //For mesh
        this.dim = 3;
        this.object = null;
        this.center = null;
        //For transformation
        this.translate = null;
        this.rotatex = null;
        this.rotatey = null;
        this.rotatez = null;
        this.scale = null;
        this.projection = null;
        //For texture
        this.texture = null;
    }

    loadMesh(object, dim = 3)
    {
        this.object = object.slice();
        this.dim = dim;
        this.center = this.objectCenter();
    }

    loadTexture(texture)
    {
        this.texture = texture.slice();
    }

    configObject()
    {
        this.translate = MatrixTransform.translation(this.param.move_x, this.param.move_y, this.param.move_z);
        this.rotatex = MatrixTransform.xRotation(degToRad(this.param.rotate_x));
        this.rotatey = MatrixTransform.yRotation(degToRad(this.param.rotate_y));
        this.rotatez = MatrixTransform.zRotation(degToRad(this.param.rotate_z));
        this.scale = MatrixTransform.scaling(this.param.scale_x, this.param.scale_y, this.param.scale_z);
    }

    setProjection(projection)
    {
        this.projection = projection;
    }

    configCenter()
    {
        let center = null;
        let tMatrix = listToMatrix(this.transformMatrix(false, false), this.dim + 1);
        let tObject = listToMatrix(this.object, this.dim);
        for (let i = 0; i < tObject.length; i++)
            tObject[i].push(1);
        let transformed = AnyMatrixMultiply(tObject, tMatrix);
        let transformedObject = [];
        for (let i = 0; i < transformed.length; i++)
        {
            transformed[i].pop();
            for (let j = 0; j < transformed[i].length; j++)
                transformedObject.push(transformed[i][j]);
        }

        center = this.objectCenter(transformedObject);
        return center;
    }

    transformMatrix(rotateOnCenter = false, projectionUse = true)
    {
        let matrix = MatrixTransform.identity();
        if (projectionUse)
            matrix = MatrixMultiply(matrix, this.projection);
        matrix = MatrixMultiply(matrix, this.translate);
        matrix = MatrixMultiply(matrix, this.rotatex);
        matrix = MatrixMultiply(matrix, this.rotatey);
        matrix = MatrixMultiply(matrix, this.rotatez);
        matrix = MatrixMultiply(matrix, this.scale);
        if (rotateOnCenter)
        {
            let moveCenter = MatrixMultiply(MatrixTransform.identity(), MatrixTransform.translation(-this.center[0], -this.center[1], -this.center[2]));
            matrix = MatrixMultiply(matrix, moveCenter);
        }
        return matrix;
    }

    objectCenter(model = null)
    {
        if (this.object == null && model == null) return null;
        let modelWorking = model == null ? this.object : model;
        const filterX = function(v, i)
        {
            return i % 3 == 0;
        };
        const filterY = function(v, i)
        {
            return i % 3 == 1;
        };
        const filterZ = function(v, i)
        {
            return i % 3 == 2;
        };
        let xAll = modelWorking.filter(filterX);
        let xMax = Math.max.apply(null, xAll);
        let yAll = modelWorking.filter(filterY);
        let yMax = Math.max.apply(null, yAll);
        let zAll = modelWorking.filter(filterZ);
        let zMax = Math.max.apply(null, zAll);
        return [Math.floor(xMax / 2), Math.floor(yMax / 2), Math.floor(zMax / 2)];
    }
}