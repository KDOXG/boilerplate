"use strict";

function main()
{
    var SP = new ShaderProgram();
    var objectToLoad = new ObjectModel();

    var translate = null;
    var rotatex = null;
    var rotatey = null;
    var rotatez = null;
    var scale = null;
    var projection = null;

    SP.setupProgram();
    SP.getLocations();

    SP.setScreen();
    SP.clearColor();

    SP.runProgram();

    loadGUI();

    //Main render loop
    
    function render()
    {
        //debugger;
        projection = MatrixTransform.perspective(degToRad(config.FOV), SP.getCanvasSize()[0] / SP.getCanvasSize()[1], config.zNear, config.zFar);

        objectToLoad.loadMesh(LetterF_3D);
        objectToLoad.loadTexture(color_LetterF_3D);
        translate = MatrixTransform.translation(config.move_x, config.move_y, config.move_z);
        rotatex = MatrixTransform.xRotation(degToRad(config.rotate_x));
        rotatey = MatrixTransform.yRotation(degToRad(config.rotate_y));
        rotatez = MatrixTransform.zRotation(degToRad(config.rotate_z));
        scale = MatrixTransform.scaling(config.scale_x, config.scale_y, config.scale_z);
        objectToLoad.configMesh(translate, rotatex, rotatey, rotatez, scale, projection);
        SP.draw(objectToLoad);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();