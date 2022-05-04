class ObjectModel
{
    constructor()
    {
        this.dim = 3;
        this.object = null;
        this.x = 0;
        this.y = 0;
        this.z = 0;
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

    configObject(translate, rotatex, rotatey, rotatez, scale, projection)
    {
        this.translate = translate;
        this.rotatex = rotatex;
        this.rotatey = rotatey;
        this.rotatez = rotatez;
        this.scale = scale;
        this.projection = projection;
    }

    configCenter()
    {
        let center = null;
        center = this.objectCenter();
        return center;
    }

    transformMatrix(center = false)
    {
        let matrix = MatrixTransform.identity();
        matrix = MatrixMultiply(matrix, this.projection);
        matrix = MatrixMultiply(matrix, this.translate);
        matrix = MatrixMultiply(matrix, this.rotatex);
        matrix = MatrixMultiply(matrix, this.rotatey);
        matrix = MatrixMultiply(matrix, this.rotatez);
        matrix = MatrixMultiply(matrix, this.scale);
        if (center)
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