class Camera
{
    constructor()
    {
        this.matrix = null;
        this.lookAt = null;
        this.matrixView = null;
        this.viewProjectionMatrix = null;
        this.viewLookAt = null;
        this.cameraPosition = null;
        this.target = null;
        this.zAxis = null;
    }

    configCamera(cameraMatrixTranslate, cameraMatrixRotatex, cameraMatrixRotatey, cameraMatrixRotatez)
    {
        let matrix = MatrixTransform.identity();
        matrix = MatrixMultiply(matrix, cameraMatrixRotatex);
        matrix = MatrixMultiply(matrix, cameraMatrixRotatey);
        matrix = MatrixMultiply(matrix, cameraMatrixRotatez);
        matrix = MatrixMultiply(matrix, cameraMatrixTranslate);
        this.matrix = matrix;
        this.cameraPosition = [matrix[12], matrix[13], matrix[14]];
        this.matrixView = MatrixTransform.inverse(matrix);
    }

    setProjectionMatrix(projectionMatrix)
    {
        this.viewProjectionMatrix = MatrixMultiply(projectionMatrix, this.matrixView);
    }

    setLookAt(position, up = [0, 1, 0])
    {
        this.lookAt = MatrixTransform.lookAt(this.cameraPosition, position, up);
        this.viewLookAt = MatrixTransform.inverse(this.lookAt);
    }
}