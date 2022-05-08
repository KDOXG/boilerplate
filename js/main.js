"use strict";

function main() {
    //Classes
    let SP = new ShaderProgram();
    let objectToLoad = new ObjectModel();
    let camera = new Camera();

    //Animation
    let animationParam = 0;
    let animationMode = config.animation;
    let then = 0;
    let deltaTime = 0;
    let rotationSpeed = 1.2;

    //Mesh transformation matrices
    let projection = null;

    SP.initSystem();

    loadGUI();

    //Main render loop

    function render(now) {
        then = now;

        projection = MatrixTransform.perspective(degToRad(config.FOV), SP.getCanvasSize()[0] / SP.getCanvasSize()[1], config.zNear, config.zFar);

        camera.loadCamera(config_camera);
        camera.configCamera();
        camera.setCamera();
        camera.setProjectionMatrix(projection);

        objectToLoad.loadMesh(LetterF_3D, config_object);
        objectToLoad.loadTexture(color_LetterF_3D);
        objectToLoad.configObject();

        camera.setLookAt(objectToLoad.configCenter());
        camera.setProjectionLookAt(projection);

        objectToLoad.setProjection(camera.getViewMode());

        SP.draw(objectToLoad);

        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                then = 0;
                animationParam = degToRad(objectToLoad.param.rotate_y);
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

    function animation1(now) {
        now *= 0.001;
        deltaTime = now - then;
        then = now;

        animationParam += rotationSpeed * deltaTime;

        objectToLoad.rotatey = MatrixTransform.yRotation(animationParam);

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

    function animation2(now) {
        then = now;


        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                then = 0;
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

    function animation3(now) {
        then = now;


        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                then = 0;
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
