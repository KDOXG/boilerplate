"use strict";

function main() {
    let SP = new ShaderProgram();
    let objectToLoad = new ObjectModel();
    let camera = new Camera();

    let animationMode = config.animation;
    let animationObjectParam = null;
    let animationCameraParam = null;
    let then = 0;
    let deltaTime = 0;
    let rotationSpeed = 1.2;

    let translate = null;
    let rotatex = null;
    let rotatey = null;
    let rotatez = null;
    let scale = null;
    let projection = null;

    let cameraTranslate = null;
    let cameraRotatex = null;
    let cameraRotatey = null;
    let cameraRotatez = null;

    let cameraObject = null;

    SP.setupProgram();
    SP.getLocations();

    SP.setScreen();
    SP.clearColor();

    SP.runProgram();

    loadGUI();

    //Main render loop

    function render(now) {

        //debugger;
        projection = MatrixTransform.perspective(degToRad(config.FOV), SP.getCanvasSize()[0] / SP.getCanvasSize()[1], config.zNear, config.zFar);

        cameraTranslate = MatrixTransform.translation(config_camera.move_x, config_camera.move_y, config_camera.move_z);
        cameraRotatex = MatrixTransform.xRotation(degToRad(config_camera.rotate_x));
        cameraRotatey = MatrixTransform.yRotation(degToRad(config_camera.rotate_y));
        cameraRotatez = MatrixTransform.zRotation(degToRad(config_camera.rotate_z));
        camera.configCamera(cameraTranslate, cameraRotatex, cameraRotatey, cameraRotatez);

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

        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                animationObjectParam = Object.assign({}, config_object);
                requestAnimationFrame(animation1);
            break;
            case 2:
                animationObjectParam = Object.assign({}, config_object);
                requestAnimationFrame(animation2);
            break;
            case 3:
                animationObjectParam = Object.assign({}, config_object);
                requestAnimationFrame(animation3);
            break;
            default:
                requestAnimationFrame(render);
            break;
        }
    }

    function animation1(now) {
        now *= 0.001;
        deltaTime = now - then;
        then = now;

        animationObjectParam.rotate_y += rotationSpeed * deltaTime;

        rotatey = MatrixTransform.yRotation(animationObjectParam.rotate_y);
        objectToLoad.configObject(translate, rotatex, rotatey, rotatez, scale, camera.viewProjectionMatrix);

        SP.draw(objectToLoad);

        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                requestAnimationFrame(animation1);
            break;
            case 2:
                requestAnimationFrame(animation2);
            break;
            case 3:
                requestAnimationFrame(animation3);
            break;
            default:
                requestAnimationFrame(render);
            break;
        }
    }

    function animation2() {


        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                requestAnimationFrame(animation1);
            break;
            case 2:
                requestAnimationFrame(animation2);
            break;
            case 3:
                requestAnimationFrame(animation3);
            break;
            default:
                requestAnimationFrame(render);
            break;
        }
    }

    function animation3() {


        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                requestAnimationFrame(animation1);
            break;
            case 2:
                requestAnimationFrame(animation2);
            break;
            case 3:
                requestAnimationFrame(animation3);
            break;
            default:
                requestAnimationFrame(render);
            break;
        }
    }

    animationMode = config.animation;
    switch(animationMode)
    {
        case 0:
            requestAnimationFrame(render);
        break;
        case 1:
            requestAnimationFrame(animation1);
        break;
        case 2:
            requestAnimationFrame(animation2);
        break;
        case 3:
            requestAnimationFrame(animation3);
        break;
        default:
            requestAnimationFrame(render);
        break;
    }
}

main();