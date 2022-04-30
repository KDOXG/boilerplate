
class ObjectModel
{
    constructor()
    {
        this.dim = 3;
        this.object = null;
        this.x = 0;
        this.y = 0;
        //this.z = 0;
        this.center = null;
        this.translate = null;
        this.rotate = null;
        this.scale = null;
        this.projection = null;
    }

    loadMesh(object, dim = 3)
    {
        this.object = object.slice();
        this.dim = dim;
        this.center = this.objectCenter();
    }

    configMesh(translate, rotate, scale, projection)
    {
        this.translate = translate;
        this.rotate = rotate;
        this.scale = scale;
        this.projection = projection;
    }

    transformMatrix(center = false)
    {
        var matrix = MatrixTransform.identity();
        matrix = MatrixMultiply(matrix, this.projection);
        matrix = MatrixMultiply(matrix, this.translate);
        matrix = MatrixMultiply(matrix, this.rotate);
        matrix = MatrixMultiply(matrix, this.scale);
        if (center)
        {
            var moveCenter = MatrixMultiply(MatrixTransform.identity(), MatrixTransform.translation(-this.center[0], -this.center[1]));
            matrix = MatrixMultiply(matrix, moveCenter);
        }
        return matrix;
    }

    objectCenter()
    {
        if (this.object == null) return null;
        const filterX = function(v, i)
        {
            return i % 2 == 0;
        };
        const filterY = function(v, i)
        {
            return i % 2 == 1;
        };
        const filterZ = function(v, i)
        {
            return i % 3 == 2;
        };
        var xAll = this.object.filter(filterX);
        var xMax = Math.max.apply(null, xAll);
        var yAll = this.object.filter(filterY);
        var yMax = Math.max.apply(null, yAll);
        var zAll = null;
        var zMax = 0;
        if (this.dim >= 3)
        {
            zAll = this.object.filter(filterZ);
            zMax = Math.max.apply(null, zAll);
        }
        return [Math.floor(xMax / 2), Math.floor(yMax / 2), Math.floor(zMax / 2)];
    }

    getCenter()
    {
        return this.center;
    }

    translate(values)
    {
        if (this.object == null) return;
        var it;
        for (let i = 0; i < this.object.length / this.dim; i++)
        {
            it = i*this.dim;
            for (let j = 0; j < this.dim; j++)
            {
                this.object[it+j] += values[j];
            }
        }
    }

    /**
     * Not working
    */
    rotate(values)
    {
        if (this.object == null) return;
        var it;
        switch (this.dim)
        {
            case 2:
                for (let i = 0; i < this.object.length / this.dim; i++)
                {
                    it = i * this.dim;
                    this.object[it] = this.object[it] * values[1] + this.object[it+1] * values[0];
                    this.object[it+1] = this.object[it+1] * values[1] - this.object[it] * values[0];
                }
            break;
            case 3:

            break;
            default:
                return;
        }
    }
}