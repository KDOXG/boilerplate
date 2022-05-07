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

    let cameraMatrixTranslate = null;
    let cameraMatrixRotatex = null;
    let cameraMatrixRotatey = null;
    let cameraMatrixRotatez = null;

    let cameraObject = null;

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

        cameraMatrixTranslate = MatrixTransform.translation(config_camera.move_x, config_camera.move_y, config_camera.move_z);
        cameraMatrixRotatex = MatrixTransform.xRotation(degToRad(config_camera.rotate_x));
        cameraMatrixRotatey = MatrixTransform.yRotation(degToRad(config_camera.rotate_y));
        cameraMatrixRotatez = MatrixTransform.zRotation(degToRad(config_camera.rotate_z));
        camera.configCamera(cameraMatrixTranslate, cameraMatrixRotatex, cameraMatrixRotatey, cameraMatrixRotatez);

        camera.setProjectionMatrix(projection);

        objectToLoad.loadMesh(LetterF_3D);
        objectToLoad.loadTexture(color_LetterF_3D);
        translate = MatrixTransform.translation(config_object.move_x, config_object.move_y, config_object.move_z);
        rotatex = MatrixTransform.xRotation(degToRad(config_object.rotate_x));
        rotatey = MatrixTransform.yRotation(degToRad(config_object.rotate_y));
        rotatez = MatrixTransform.zRotation(degToRad(config_object.rotate_z));
        scale = MatrixTransform.scaling(config_object.scale_x, config_object.scale_y, config_object.scale_z);

        objectToLoad.configObject(translate, rotatex, rotatey, rotatez, scale, camera.viewProjectionMatrix);

        //camera.setLookAt(objectToLoad.configCenter());
        cameraObject = config_camera.lookAt == 0 ? camera.viewProjectionMatrix : camera.viewLookAt;

        //objectToLoad.configObject(translate, rotatex, rotatey, rotatez, scale, cameraObject);

        SP.draw(objectToLoad);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
