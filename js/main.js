"use strict";

function main() {
    //GUI
    loadGUI();

    //Classes
    let SP = new ShaderProgram();
    let camera = null;

    //Object lists
    let objectsToLoad = [new ObjectModel({...config_object})];
    let cameras = [new Camera({...config_camera})];

    //Animation
    let animationParam = 0;
    let animationMode = config.animation;
    let then = 0;
    let deltaTime = 0;
    let rotationSpeed = 1.2;

    //Projection matrix
    let projection = null;

    //States
    let state_newObj = 0;
    let state_newCamera = 0;

    SP.initSystem();

    //Main render loop

    function render(now) {
        then = now;

        projection = MatrixTransform.perspective(degToRad(config.FOV), SP.getCanvasSize()[0] / SP.getCanvasSize()[1], config.zNear, config.zFar);
        if (config.newCamera == 1 && state_newCamera == 0)
        {
            cameras.push(new Camera({...config_camera}));
            state_newCamera = 1;
        }
        if (config.newCamera == 0)
            state_newCamera = 0;
        
        camera = config.camera >= 0 && config.camera < cameras.length ? cameras[config.camera] : cameras[0];

        camera.configCamera();
        camera.setCamera();

        camera.setProjectionMatrix(projection);

        if (config.newObject == 1 && state_newObj == 0)
        {
            objectsToLoad.push(new ObjectModel({...config_object}));
            state_newObj = 1;
        }
        if (config.newObject == 0)
            state_newObj = 0;
        

        objectsToLoad.forEach((objectToLoad) => {

            objectToLoad.loadMesh(LetterF_3D);
            objectToLoad.loadTexture(color_LetterF_3D);
            objectToLoad.configObject();
    
            camera.setLookAt(objectToLoad.configCenter());
            camera.setProjectionLookAt(projection);
    
            objectToLoad.setProjection(camera.getViewMode());
    
            SP.draw(objectToLoad);

        });

        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                then = 0;
                animationParam = degToRad(objectsToLoad[0].param.rotate_y);
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

        objectsToLoad.forEach((objectToLoad) => {

        objectToLoad.rotatey = MatrixTransform.yRotation(animationParam);
        SP.draw(objectToLoad);
        
        });

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
