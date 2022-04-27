"use strict";

function main()
{
    var SP = new ShaderProgram();
    var objectToLoad = new Transform();

    var translate = null;
    var rotate = null;
    var scale = null;

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
        objectToLoad.loadMesh(positions, 2);
        translate = [config.move_x, config.move_y];
        rotate = [Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))];
        scale = [config.scale*2, config.scale*2];
        objectToLoad.configMesh(translate, rotate, scale);
        SP.draw(objectToLoad, COLOR_RED);
        
        translate = [config.move_x, config.move_y+20];
        scale = [config.scale, config.scale];
        objectToLoad.configMesh(translate, rotate, scale);
        SP.draw(objectToLoad, COLOR_GREEN);

        objectToLoad.loadMesh(pixel_downTriangle, 2);
        translate = [config.move_x + 10, config.move_y];
        rotate = [Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))];
        scale = [config.scale*1.5, config.scale*1.5];
        objectToLoad.configMesh(translate, rotate, scale);
        SP.draw(objectToLoad, COLOR_GREEN);

        translate = [config.move_x + 10, config.move_y + 30];
        scale = [config.scale, config.scale];
        objectToLoad.configMesh(translate, rotate, scale);
        SP.draw(objectToLoad, COLOR_BLUE);

        objectToLoad.loadMesh(pixel_upTriangle, 2);
        translate = [config.move_x + 100, config.move_y];
        rotate = [Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))];
        scale = [config.scale*0.5, config.scale*0.5];
        objectToLoad.configMesh(translate, rotate, scale);
        SP.draw(objectToLoad, COLOR_BLUE);

        translate = [config.move_x + 100, config.move_y + 50];
        scale = [config.scale, config.scale];
        objectToLoad.configMesh(translate, rotate, scale);
        SP.draw(objectToLoad, COLOR_RED);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();