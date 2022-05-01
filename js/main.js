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
    
    SP.setBuffer();
    SP.setVAO();
    SP.runVAO();

    SP.setScreen();
    SP.clearColor();

    SP.runProgram();

    loadGUI();

    //Main render loop
    
    function render()
    {
        //debugger;
        projection = MatrixTransform.projection3(SP.getCanvasSize()[0], SP.getCanvasSize()[1], 400);

        objectToLoad.loadMesh(LetterF);
        translate = MatrixTransform.translation(config.move_x, config.move_y, config.move_z);
        rotatex = MatrixTransform.xRotation(degToRad(config.rotate_x));
        rotatey = MatrixTransform.yRotation(degToRad(config.rotate_y));
        rotatez = MatrixTransform.zRotation(degToRad(config.rotate_z));
        scale = MatrixTransform.scaling(config.scale_x, config.scale_y, config.scale_z);
        objectToLoad.configMesh(translate, rotatex, rotatey, rotatez, scale, projection);
        SP.draw(objectToLoad, COLOR_RED);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();