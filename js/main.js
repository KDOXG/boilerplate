"use strict";

function main()
{
    var SP = new ShaderProgram();
    var objectToLoad = new ObjectModel();

    var translate = null;
    var rotate = null;
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
        projection = MatrixTransform.projection(SP.getCanvasSize()[0], SP.getCanvasSize()[1]);

        objectToLoad.loadMesh(positions, 2);
        translate = MatrixTransform.translation(config.move_x, config.move_y);
        rotate = MatrixTransform.rotation(degToRad(config.rotate_h));
        scale = MatrixTransform.scaling(config.scale_x, config.scale_y);
        objectToLoad.configMesh(translate, rotate, scale, projection);
        SP.draw(objectToLoad, COLOR_RED);
        
        translate = MatrixTransform.translation(config.move_x, config.move_y+20);
        objectToLoad.configMesh(translate, rotate, scale, projection);
        SP.draw(objectToLoad, COLOR_GREEN, true);

        objectToLoad.loadMesh(pixel_downTriangle, 2);
        translate = MatrixTransform.translation(config.move_x+10, config.move_y);
        rotate = MatrixTransform.rotation(degToRad(config.rotate_h));
        scale = MatrixTransform.scaling(config.scale_x*1.5, config.scale_y*1.5);
        objectToLoad.configMesh(translate, rotate, scale, projection);
        SP.draw(objectToLoad, COLOR_GREEN, true);

        translate = MatrixTransform.translation(config.move_x+10, config.move_y+30);
        scale = MatrixTransform.scaling(config.scale_x, config.scale_y);
        objectToLoad.configMesh(translate, rotate, scale, projection);
        SP.draw(objectToLoad, COLOR_BLUE);

        objectToLoad.loadMesh(pixel_upTriangle, 2);
        translate = MatrixTransform.translation(config.move_x+100, config.move_y);
        rotate = MatrixTransform.rotation(degToRad(config.rotate_h));
        scale = MatrixTransform.scaling(config.scale_x*0.5, config.scale_y*0.5);
        objectToLoad.configMesh(translate, rotate, scale, projection);
        SP.draw(objectToLoad, COLOR_BLUE);

        translate = MatrixTransform.translation(config.move_x+100, config.move_y+50);
        scale = MatrixTransform.scaling(config.scale_x, config.scale_y);
        objectToLoad.configMesh(translate, rotate, scale, projection);
        SP.draw(objectToLoad, COLOR_RED, true);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();