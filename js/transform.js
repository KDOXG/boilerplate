

class Transform
{
    constructor()
    {
        this.dim = 3;
        this.object = null;
        this.x = 0;
        this.y = 0;
        this.translate = null;
        this.rotate = null;
        this.scale = null;
    }

    loadMesh(object, dim = 3)
    {
        this.object = object.slice();
        this.dim = dim;
    }

    configMesh(translate, rotate, scale)
    {
        this.translate = translate;
        this.rotate = rotate;
        this.scale = scale;
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