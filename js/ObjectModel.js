
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

    configMesh(translate, rotatex, rotatey, rotatez, scale, projection)
    {
        this.translate = translate;
        this.rotatex = rotatex;
        this.rotatey = rotatey;
        this.rotatez = rotatez;
        this.scale = scale;
        this.projection = projection;
    }

    transformMatrix(center = false)
    {
        var matrix = MatrixTransform.identity();
        matrix = MatrixMultiply4(matrix, this.projection);
        matrix = MatrixMultiply4(matrix, this.translate);
        matrix = MatrixMultiply4(matrix, this.rotatex);
        matrix = MatrixMultiply4(matrix, this.rotatey);
        matrix = MatrixMultiply4(matrix, this.rotatez);
        matrix = MatrixMultiply4(matrix, this.scale);
        if (center)
        {
            var moveCenter = MatrixMultiply4(MatrixTransform.identity(), MatrixTransform.translation(-this.center[0], -this.center[1], -this.center[2]));
            matrix = MatrixMultiply4(matrix, moveCenter);
        }
        return matrix;
    }

    objectCenter()
    {
        if (this.object == null) return null;
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
        var xAll = this.object.filter(filterX);
        var xMax = Math.max.apply(null, xAll);
        var yAll = this.object.filter(filterY);
        var yMax = Math.max.apply(null, yAll);
        var zAll = this.object.filter(filterZ);
        var zMax = Math.max.apply(null, zAll);
        return [Math.floor(xMax / 2), Math.floor(yMax / 2), Math.floor(zMax / 2)];
    }

    getCenter()
    {
        return this.center;
    }
}