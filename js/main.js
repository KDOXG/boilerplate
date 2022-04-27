"use strict";

function main()
{
    var SP = new ShaderProgram();
    var transform2D = new Transform(2);
    var params = [1, 0, 0];

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
        SP.draw(transform2D.translate(positions, [config.move_x, config.move_y]), COLOR_RED);
        
        SP.draw(positions, COLOR_GREEN, [config.move_x, config.move_y+20]);

        SP.draw(transform2D.translate(pixel_downTriangle, [config.move_x + 10, config.move_y]), COLOR_GREEN);

        SP.draw(pixel_downTriangle, COLOR_BLUE, [config.move_x + 10, config.move_y + 30]);

        SP.draw(transform2D.translate(pixel_upTriangle, [config.move_x + 100, config.move_y]), COLOR_BLUE);

        SP.draw(pixel_upTriangle, COLOR_RED, [config.move_x + 100, config.move_y + 50]);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();