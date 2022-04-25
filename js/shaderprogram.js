/*
const vertexShaderSource = 
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

const fragmentShaderSource = 
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
*/

var vertexShaderSource = `#version 300 es

in vec2 a_position;

uniform vec2 u_resolution;

void main() {
  
    vec2 zeroToOne = a_position / u_resolution;

    vec2 zeroToTwo = zeroToOne * 2.0;

    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

}
`;

var fragmentShaderSource = `#version 300 es

precision highp float;

uniform vec4 u_color;

out vec4 outColor;

void main() {
    outColor = u_color;
}
`;

class shaderProgram
{
    constructor()
    {
        this.canvas = document.querySelector("#canvas");
        this.gl = canvas.getContext("webgl2");
        if (!this.gl)
        {
            console.log("Error canvas");
        }
        webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
        this.program = this.gl.createProgram();
        this.positionLocation = null;
        this.colorLocation = null;
        this.resolutionLocation = null;
        this.colorLocation = null;
        this.vao = null;
    }

    setupProgram()
    {
        var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

        this.gl.shaderSource(vertexShader, vertexShaderSource);
        this.gl.shaderSource(fragmentShader, fragmentShaderSource);

        this.gl.compileShader(vertexShader);
        this.gl.compileShader(fragmentShader);

        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS))
        {
        console.log('erro vertex shader');
        console.log(this.gl.getShaderInfoLog(vertexShader));
        }

        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS))
        {
        console.log('erro fragment shader');
        console.log(this.gl.getShaderInfoLog(fragmentShader));
        }

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);

        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
        {
            console.log('erro linkProgram');
            console.log(this.gl.getProgramInfoLog(this.program));
        }
    }

    runProgram()
    {
        this.gl.useProgram(this.program);
        this.gl.uniform2f(this.resolutionLocation, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.bindVertexArray(this.vao);
    }

    getLocations()
    {
        this.positionLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.colorLocation = this.gl.getUniformLocation(this.program, "u_color");
        this.resolutionLocation = this.gl.getUniformLocation(this.program, "u_resolution");
    }

    setBuffer()
    {
        var buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    }

    putBuffer(vertexarrayData, drawmodeData = this.gl.STATIC_DRAW)
    {
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexarrayData), drawmodeData);
    }

    putColor(color)
    {
        switch(color)
        {
            case COLOR_RED:
                this.gl.uniform4f(this.colorLocation, 255, 0, 0, 1);
            break;
            case COLOR_GREEN:
                this.gl.uniform4f(this.colorLocation, 0, 255, 0, 1);
            break;
            case COLOR_BLUE:
                this.gl.uniform4f(this.colorLocation, 0, 0, 255, 1);
            break;
            default:
                this.gl.uniform4f(this.colorLocation, 0, 0, 0, 1);
        }
    }

    setVAO()
    {
        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(this.positionLocation);
    }

    runVAO(size = 2)
    {
        var normalize = false;
        var stride = 0;
        var offset = 0;
        var type = this.gl.FLOAT;
        this.gl.vertexAttribPointer(this.positionLocation, size, type, normalize, stride, offset);
    }

    setScreen()
    {
        webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    clearColor()
    {
        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(this.gl.COLLOR_BUFFER_BIT);
    }

    primitiveDraw(offset = 0, count = 3)
    {
        var primitive = this.gl.TRIANGLES;
        this.gl.drawArrays(primitive, offset, count);
    }
}