var vertexShaderSource = 
`#version 300 es

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

void main()
{
    gl_Position = u_matrix * a_position;
    v_color = a_color;
}`
;

var fragmentShaderSource = 
`#version 300 es

precision highp float;

in vec4 v_color;

uniform vec4 u_color;

out vec4 outColor;

void main()
{
    outColor = v_color * u_color;
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

function getLocations(gl, program)
{
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var colorLocation = gl.getUniformLocation(program, "u_color");

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    return 
    {
        positionLocation,
        colorLocation
    };
}

function setBuffer(gl)
{
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    
    return buffer;
}