window.onload = function () {
  cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);
    let scene = new cc.Scene();
    cc.director.runScene(scene);
    // TriNode.js
    const VERT_SRC = `
attribute vec4 a_position;
uniform mat4 u_MVPMatrix;
void main() {
  gl_Position = u_MVPMatrix * a_position;
}
`;

    const FRAG_SRC = `
#ifdef GL_ES
precision mediump float;
#endif
uniform vec4 u_color;
void main() {
  gl_FragColor = u_color;
}
`;

    class TriNode extends cc.Node {
      private gl: WebGLRenderingContext;
      private program: cc.GLProgram;
      private glProgram: WebGLProgram;
      private vbo: WebGLBuffer;
      private colorFloat32: [number, number, number, number];

      constructor(
        public triWidth = 100,
        public triHeight = 100,
        color: [number, number, number, number] = [1, 0.5, 0.2, 1]
      ) {
        super();
        super.ctor();
        this.gl = cc._renderContext as WebGLRenderingContext;
        this.colorFloat32 = color;

        // Tạo GLProgram (wrapper)
        const program = new cc.GLProgram();
        program.initWithString(VERT_SRC, FRAG_SRC);
        program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
        program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
        if (!program.link()) {
          console.error("Failed to link shader program");
          return;
        }
        program.updateUniforms();
        this.program = program;

        // Lấy WebGLProgram thực
        this.glProgram = program.getProgram();

        // Vertex buffer (tam giác)
        const w = triWidth, h = triHeight;
        const vertices = new Float32Array([
          0, h / 2, 0,
          -w / 2, -h / 2, 0,
          w / 2, -h / 2, 0,
        ]);
        const vbo = this.gl.createBuffer()!;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.vbo = vbo;
      }

      visit(parentCmd?: any) {
        super.visit(parentCmd);
        this.renderTriangle();
      }

      private renderTriangle() {
        const gl = this.gl;
        const program = this.program;
        program.use();
        program.setUniformsForBuiltins();

        const glProg = this.glProgram;

        // uniform locations
        const uMVP = gl.getUniformLocation(glProg, "u_MVPMatrix");
        const uColor = gl.getUniformLocation(glProg, "u_color");

        // attribute location
        const aPos = gl.getAttribLocation(glProg, "a_position");

        // node's world matrix
        console.log(this._renderCmd)
        var affine = (this as any)._renderCmd._worldTransform
        const mat4 = new cc.math.Matrix4();
        mat4.mat = new Float32Array([
          affine.a, affine.b, 0, 0,
          affine.c, affine.d, 0, 0,
          0, 0, 1, 0,
          affine.tx, affine.ty, 0, 1
        ]);
        gl.uniformMatrix4fv(uMVP, false, mat4.mat);
        gl.uniform4fv(uColor, new Float32Array(this.colorFloat32));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.disableVertexAttribArray(aPos);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        cc.g_NumberOfDraws++;
      }
    }
    // trong scene hoặc layer của bạn
    const tri = new TriNode(160, 120, [0.2, 0.7, 1.0, 1.0]); // width, height, rgba
    tri.setPosition(200, 150);
    // tri.setAnchorPoint(0.5, 0.5);
    scene.addChild(tri);
  };
  cc.game.run();
};
