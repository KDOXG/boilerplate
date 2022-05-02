class Camera
{
    constructor()
    {
        this.matrix = null;
        this.matrixView = null;
        this.viewProjectionMatrix = null;
    }
    configCamera(cameraMatrix, cameraMatrixTranslate)
    {
        let matrix = MatrixTransform.identity();
        matrix = MatrixMultiply4(matrix, cameraMatrix);
        matrix = MatrixMultiply4(matrix, cameraMatrixTranslate);
        this.matrix = matrix;
        this.matrixView = MatrixTransform.inverse(matrix);
    }
    setProjectionMatrix(projectionMatrix)
    {
        this.viewProjectionMatrix = MatrixMultiply4(projectionMatrix, this.matrixView);
    }
}