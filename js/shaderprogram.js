var vertexShaderSource = `#version 300 es

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

void main() {

    gl_Position = u_matrix * a_position;

    v_color = a_color;

}
`;

var fragmentShaderSource = `#version 300 es

precision highp float;

in vec4 v_color;

out vec4 outColor;

void main() {
    outColor = v_color;
}
`;

class ShaderProgram
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
        this.vao = null;

        //Buffers
        this.positionBuffer = null;
        this.colorBuffer = null;

        //Locations
        this.positionLocation = null;
        this.colorLocation = null;
        this.translationLocation = null;
        this.rotationLocation = null;
        this.scaleLocation = null;
        this.matrixLocation = null;
    }

    setupProgram()
    {
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

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
        this.gl.bindVertexArray(this.vao);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
    }

    getLocations()
    {
        this.positionLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.colorLocation = this.gl.getAttribLocation(this.program, "a_color");
        this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
    }

    getCanvasSize()
    {
        return [this.gl.canvas.clientWidth, this.gl.canvas.clientHeight];
    }

    setPosition(object, size = 3)
    {
        this.positionBuffer = this.gl.createBuffer();
        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(this.positionLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        this.putObject(object);

        const normalize = false;
        const stride = 0;
        const offset = 0;
        const type = this.gl.FLOAT;
        this.gl.vertexAttribPointer(this.positionLocation, size, type, normalize, stride, offset);
    }

    setColor(texture, size = 3)
    {
        this.colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.enableVertexAttribArray(this.colorLocation);

        this.putColor(texture);

        const normalize = true;
        const stride = 0;
        const offset = 0;
        const type = this.gl.UNSIGNED_BYTE;
        this.gl.vertexAttribPointer(this.colorLocation, size, type, normalize, stride, offset);
    }

    putObject(vertexarrayData, drawmodeData = this.gl.STATIC_DRAW)
    {
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexarrayData), drawmodeData);
    }

    putColor(color, drawmodeData = this.gl.STATIC_DRAW)
    {
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(color), drawmodeData);
    }

    setScreen()
    {
        webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    clearColor()
    {
        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(this.gl.COLLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    primitiveDraw(offset = 0, count = 3)
    {
        const primitive = this.gl.TRIANGLES;
        this.gl.drawArrays(primitive, offset, count);
    }

    draw(object, center = false)
    {
        this.gl.uniformMatrix4fv(this.matrixLocation, false, object.transformMatrix(center));
        this.setPosition(object.object);
        this.setColor(object.texture);
        this.primitiveDraw(0, object.object.length / object.dim);
    }
}