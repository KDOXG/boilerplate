var vertexShaderSource = 
`#version 300 es

in vec3 a_position;

void main()
{
    gl_Position = vec4(a_position,1.0);
}`
;

var fragmentShaderSource = 
`#version 300 es

precision highp float;
out vec4 outColor;
uniform vec4 u_color;

void main()
{
    outColor = u_color;
}`
;

function initCanvas()
{
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl2");
    if (!gl)
    {
        console.log("Erro canvas");
        return;
    }
    return gl;
}

function setupProgram(gl)
{
    var program = gl.createProgram();
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    {
      console.log('erro vertex shader');
      console.log(gl.getShaderInfoLog(vertexShader));
    }

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    {
      console.log('erro fragment shader');
      console.log(gl.getShaderInfoLog(fragmentShader));
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.log('erro linkProgram');
        console.log(gl.getProgramInfoLog(program));
    }

    return program;
}