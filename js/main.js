"use strict";

function main()
{
    var SP = new ShaderProgram();
    var transform2D = new Transform();

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
        transform2D.loadMesh(positions, 2);
        transform2D.translate([config.move_x, config.move_y]);
        transform2D.rotate([Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);
        SP.draw(transform2D.object, COLOR_RED);

        /*
        transform2D.loadMesh(positions, 2);
        transform2D.translate([config.move_x, config.move_y+20]);
        transform2D.rotate([Math.sin(config.rotate_h), Math.cos(config.rotate_h)]);
        SP.draw(transform2D.object, COLOR_GREEN);
        */
        SP.draw(positions, COLOR_GREEN, 2, [config.move_x, config.move_y+20], [Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);

        transform2D.loadMesh(pixel_downTriangle, 2);
        transform2D.translate([config.move_x + 10, config.move_y]);
        transform2D.rotate([Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);
        SP.draw(transform2D.object, COLOR_GREEN);

        /*
        transform2D.loadMesh(pixel_downTriangle, 2);
        transform2D.translate([config.move_x + 10, config.move_y + 30]);
        transform2D.rotate([Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);
        SP.draw(transform2D.object, COLOR_BLUE);
        */
        SP.draw(pixel_downTriangle, COLOR_BLUE, 2, [config.move_x + 10, config.move_y + 30], [Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);

        transform2D.loadMesh(pixel_upTriangle, 2);
        transform2D.translate([config.move_x + 100, config.move_y]);
        transform2D.rotate([Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);
        SP.draw(transform2D.object, COLOR_BLUE);

        /*
        transform2D.loadMesh(pixel_upTriangle, 2);
        transform2D.translate([config.move_x + 100, config.move_y + 50]);
        transform2D.rotate([Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);
        SP.draw(transform2D.object, COLOR_RED);
        */
        SP.draw(pixel_upTriangle, COLOR_RED, 2, [config.move_x + 100, config.move_y + 50], [Math.sin(degToRad(config.rotate_h)), Math.cos(degToRad(config.rotate_h))]);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();