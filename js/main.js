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
    let animationParam = 
    {
        xRotation: 0,
        yRotation: 0,
        xMove: 0,
        yMove: 0,
        zMove: 0,
    };
    function animationParamInit(param = null)
    {
        if (param == null)
            return {
                xRotation: 0,
                yRotation: 0,
                xMove: 0,
                yMove: 0,
                zMove: -360,
            };
        return {
            xRotation: 0,
            yRotation: 0,
            xMove: param.move_x,
            yMove: param.move_y,
            zMove: param.move_z
        };
    }
    let animationMode = config.animation;
    let then = 0;
    let deltaTime = 0;
    let animationSpeed = 1.2;

    //Projection matrix
    let projection = null;

    //Flags
    let flagObj = 
    {
        flagNewObj: 0,
        flagNewCamera: 0,
        Anim2Step: 0,
        Anim2Counter: 0,
        init: () => {
            this.flagNewObj = 0;
            this.flagNewCamera = 0;
            this.Anim2Step = 0;
            this.Anim2Counter = 0;
        },
    };

    function useCamera()
    {
        if (config.newCamera == 1 && flagObj.flagNewCamera == 0)
        {
            cameras.push(new Camera({...config_camera}));
            flagObj.flagNewCamera = 1;
        }
        if (config.newCamera == 0)
            flagObj.flagNewCamera = 0;
        return config.camera >= 0 && config.camera < cameras.length ? cameras[config.camera] : cameras[0];
    };

    function checkNewObject()
    {
        if (config.newObject == 1 && flagObj.flagNewObj == 0)
        {
            objectsToLoad.push(new ObjectModel({...config_object}));
            flagObj.flagNewObj = 1;
        }
        if (config.newObject == 0)
            flagObj.flagNewObj = 0;
    }

    SP.initSystem();

    //Main render loop

    function render(now) {
        then = now;

        projection = MatrixTransform.perspective(degToRad(config.FOV), SP.getCanvasSize()[0] / SP.getCanvasSize()[1], config.zNear, config.zFar);

        camera = useCamera();
        camera.configCamera();
        camera.setCamera();

        camera.setProjectionMatrix(projection);

        checkNewObject();
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
                animationParam = animationParamInit();
                animationParam.yRotation = degToRad(objectsToLoad[0].param.rotate_y);
                requestAnimationFrame(animation1);
            break;
            case 2:
                animationParam = animationParamInit();
                requestAnimationFrame(animation2);
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

        animationParam.yRotation += animationSpeed * deltaTime;

        objectsToLoad.forEach((objectToLoad) => {

            objectToLoad.rotatey = MatrixTransform.yRotation(animationParam.yRotation);
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
                animationParam = animationParamInit();
                requestAnimationFrame(animation2);
            break;
            default:
                requestAnimationFrame(render);
            break;
        }
    }

    function animation2(now) {
        now *= 0.001;
        deltaTime = now - then;
        then = now;

        switch(flagObj.Anim2Step)
        {
            case 0:

                animationParam.yMove += animationSpeed * deltaTime * 50;
                flagObj.Anim2Counter++;

                objectsToLoad.forEach((objectToLoad) => {
        
                    objectToLoad.translate = MatrixTransform.translation(animationParam.xMove, animationParam.yMove, animationParam.zMove);

                    SP.draw(objectToLoad);
                
                });

                if (flagObj.Anim2Counter == 100)
                {
                    flagObj.Anim2Step = 1;
                }

            break;
            case 1:

                animationParam.xRotation += animationSpeed * deltaTime;
                flagObj.Anim2Counter++;

                objectsToLoad.forEach((objectToLoad) => {
        
                    objectToLoad.rotatex = MatrixTransform.xRotation(animationParam.xRotation);

                    SP.draw(objectToLoad);
                
                });

                if (flagObj.Anim2Counter == 200)
                {
                    flagObj.Anim2Step = 2;
                }
                if (flagObj.Anim2Counter == 400)
                {
                    flagObj.Anim2Step = 3;
                }
                if (flagObj.Anim2Counter == 600)
                {
                    flagObj.Anim2Step = 4;
                }
                if (flagObj.Anim2Counter == 800)
                {
                    flagObj.Anim2Step = 0;
                    flagObj.Anim2Counter = 0;
                }

            break;
            case 2:

                animationParam.xMove += animationSpeed * deltaTime * 50;
                flagObj.Anim2Counter++;

                objectsToLoad.forEach((objectToLoad) => {
        
                    objectToLoad.translate = MatrixTransform.translation(animationParam.xMove, animationParam.yMove, animationParam.zMove);

                    SP.draw(objectToLoad);
                
                });

                if (flagObj.Anim2Counter == 300)
                {
                    flagObj.Anim2Step = 1;
                }

            break;
            case 3:

                animationParam.yMove -= animationSpeed * deltaTime * 50;
                flagObj.Anim2Counter++;

                objectsToLoad.forEach((objectToLoad) => {
        
                    objectToLoad.translate = MatrixTransform.translation(animationParam.xMove, animationParam.yMove, animationParam.zMove);

                    SP.draw(objectToLoad);
                
                });

                if (flagObj.Anim2Counter == 500)
                {
                    flagObj.Anim2Step = 1;
                }

            break;
            case 4:

                animationParam.xMove -= animationSpeed * deltaTime * 50;
                flagObj.Anim2Counter++;

                objectsToLoad.forEach((objectToLoad) => {
        
                    objectToLoad.translate = MatrixTransform.translation(animationParam.xMove, animationParam.yMove, animationParam.zMove);

                    SP.draw(objectToLoad);
                
                });

                if (flagObj.Anim2Counter == 700)
                {
                    flagObj.Anim2Step = 1;
                }

            break;
            default:

            break;
        }

        animationMode = config.animation;
        switch(animationMode)
        {
            case 0:
                requestAnimationFrame(render);
            break;
            case 1:
                animationParam = animationParamInit();
                animationParam.yRotation = degToRad(objectsToLoad[0].param.rotate_y);
                requestAnimationFrame(animation1);
            break;
            case 2:
                requestAnimationFrame(animation2);
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
        default:
            requestAnimationFrame(render);
        break;
    }
}

main();
