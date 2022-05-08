class Camera
{
    constructor()
    {
        this.matrix = null;
        this.lookAt = null;
        this.matrixView = null;
        this.viewProjectionMatrix = null;
        this.viewLookAt = null;
        this.viewProjectionLookAt = null;
        this.cameraPosition = null;
        this.target = null;
        this.zAxis = null;
        this.cameraRotatex = null;
        this.cameraRotatey = null;
        this.cameraRotatez = null;
        this.cameraTranslate = null;
    }

    configCamera(cameraTranslate, cameraRotatex, cameraRotatey, cameraRotatez)
    {
        this.cameraRotatex = cameraRotatex;
        this.cameraRotatey = cameraRotatey;
        this.cameraRotatez = cameraRotatez;
        this.cameraTranslate = cameraTranslate;
    }

    setCamera()
    {
        let matrix = MatrixTransform.identity();
        matrix = MatrixMultiply(matrix, this.cameraRotatex);
        matrix = MatrixMultiply(matrix, this.cameraRotatey);
        matrix = MatrixMultiply(matrix, this.cameraRotatez);
        matrix = MatrixMultiply(matrix, this.cameraTranslate);
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
        let matrix = null;
        matrix = MatrixTransform.lookAt(this.cameraPosition, position, up);
        this.lookAt = matrix;
        this.viewLookAt = MatrixTransform.inverse(matrix);
    }

    setProjectionLookAt(projectionMatrix)
    {
        this.viewProjectionLookAt = MatrixMultiply(projectionMatrix, this.viewLookAt);
    }
}