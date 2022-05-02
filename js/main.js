"use strict";

function main() {
    let SP = new ShaderProgram();
    let objectToLoad = new ObjectModel();
    let camera = new Camera();

    let translate = null;
    let rotatex = null;
    let rotatey = null;
    let rotatez = null;
    let scale = null;
    let projection = null;

    let cameraMatrix = null;
    let cameraMatrixTranslate = null;

    SP.setupProgram();
    SP.getLocations();

    SP.setScreen();
    SP.clearColor();

    SP.runProgram();

    loadGUI();

    //Main render loop

    function render() {
        //debugger;
        projection = MatrixTransform.perspective(degToRad(config.FOV), SP.getCanvasSize()[0] / SP.getCanvasSize()[1], config.zNear, config.zFar);

        cameraMatrix = MatrixTransform.yRotation(degToRad(config.cameraAngle));
        cameraMatrixTranslate = MatrixTransform.translation(0, 0, config.radius * 1.5);
        camera.configCamera(cameraMatrix, cameraMatrixTranslate);
        camera.setProjectionMatrix(projection);

        objectToLoad.loadMesh(LetterF_3D);
        objectToLoad.loadTexture(color_LetterF_3D);
        translate = MatrixTransform.translation(config.move_x, config.move_y, config.move_z);
        rotatex = MatrixTransform.xRotation(degToRad(config.rotate_x));
        rotatey = MatrixTransform.yRotation(degToRad(config.rotate_y));
        rotatez = MatrixTransform.zRotation(degToRad(config.rotate_z));
        scale = MatrixTransform.scaling(config.scale_x, config.scale_y, config.scale_z);
        objectToLoad.configMesh(translate, rotatex, rotatey, rotatez, scale, camera.viewProjectionMatrix);

        SP.draw(objectToLoad);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();