class Camera
{
    constructor()
    {
        this.param = null;
        this.matrix = null;
        this.lookAt = null;
        this.matrixView = null;
        this.viewProjectionMatrix = null;
        this.viewLookAt = null;
        this.viewProjectionLookAt = null;
        this.cameraPosition = null;
        this.cameraRotatex = null;
        this.cameraRotatey = null;
        this.cameraRotatez = null;
        this.cameraTranslate = null;
    }

    loadCamera(param)
    {
        this.param = param;
    }

    configCamera()
    {
        this.cameraRotatex = MatrixTransform.xRotation(degToRad(this.param.rotate_x));;
        this.cameraRotatey = MatrixTransform.yRotation(degToRad(this.param.rotate_y));;
        this.cameraRotatez = MatrixTransform.zRotation(degToRad(this.param.rotate_z));;
        this.cameraTranslate = MatrixTransform.translation(this.param.move_x, this.param.move_y, this.param.move_z);;
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

    getViewMode()
    {
        return this.param.lookAt == 0 ? this.viewProjectionMatrix : this.viewProjectionLookAt;
    }
}