"use strict";

function main()
{
    var SP = new shaderProgram();
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
        SP.putBuffer(positions);
        SP.putColor(COLOR_RED);
        SP.primitiveDraw(0, 6);

        SP.putBuffer(pixel_downTriangle);
        SP.putColor(COLOR_GREEN);
        SP.primitiveDraw(0, 3);
        SP.putBuffer(pixel_upTriangle);
        SP.putColor(COLOR_BLUE);
        SP.primitiveDraw(0, 3);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();