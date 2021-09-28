function main()
{
    var gl = initCanvas();
    var program = setupProgram(gl);
    gl.useProgram(program);

    var {positionLocation, colorLocation} = getLocations(gl, program);
    
    var buffer = setBuffer(gl);

    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLLOR_BUFFER_BIT);

    //Main render loop
    while(true)
    {

    }
}
