class Transform
{
    constructor(dim)
    {
        this.workingDim = dim;
    }

    translate(object, values)
    {
        var newObject = object.slice();
        var it;
        for (let i = 0; i < newObject.length / this.workingDim; i++)
        {
            it = i*this.workingDim;
            for (let j = 0; j < this.workingDim; j++)
            {
                newObject[it+j] += values[j];
            }
        }
        return newObject;
    }

    rotate(object, values)
    {
        var newObject = object.slice();

        return newObject;
    }
}