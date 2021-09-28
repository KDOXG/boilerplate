function main()
{
    var SP = new shaderProgram();
    SP.setupProgram();

    const colorLocation = SP.getLocations();
    
    SP.setBuffer();

    SP.clearColor();

    loadGUI();

    //Main render loop
    function render()
    {
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();