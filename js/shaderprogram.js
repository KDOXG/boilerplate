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

class shaderProgram
{
    constructor()
    {
        this.canvas = document.querySelector("#canvas");
        this.gl = canvas.getContext("webgl2");
        if (!this.gl)
        {
            console.log("Erro canvas");
        }
        this.program = this.gl.createProgram();
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
        this.gl.useProgram(this.program);
    }

    getLocations()
    {
        const positionLocation = this.gl.getAttribLocation(this.program, "a_position");
        const colorLocation = this.gl.getUniformLocation(this.program, "u_color");

        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);

        return colorLocation;
    }

    setBuffer()
    {
        var buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    }

    clearColor()
    {
        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(this.gl.COLLOR_BUFFER_BIT);
    }
}