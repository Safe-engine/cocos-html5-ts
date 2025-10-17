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
      _color: [number, number, number, number];
      _program: cc.GLProgram | null = null;
      _vbo: WebGLBuffer | null = null;

      constructor(
        public triWidth = 100,
        public triHeight = 100,
        color: [number, number, number, number] = [1, 0.5, 0.2, 1]
      ) {
        super();
        super.ctor();
        this._color = color;
        console.log(cc._renderType, cc.game.RENDER_TYPE_WEBGL)
        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
          this._renderCmd = new TriNode.WebGLRenderCmd(this);
          (this._renderCmd as any)._needDraw = true;
        } else {
          cc.log("TriNode only supports WebGL rendering");
        }
      }
    }

    // ---------- RenderCmd (phần quan trọng) ----------
    TriNode.WebGLRenderCmd = class extends cc.Node.WebGLRenderCmd {
      private gl: WebGLRenderingContext;
      private program: cc.GLProgram;
      private vbo: WebGLBuffer;
      private node: TriNode;

      constructor(node: TriNode) {
        super(node);
        // super.ctor(node);
        console.log('constructor TriNode')
        this.node = node;
        this.gl = cc._renderContext as WebGLRenderingContext;

        // Compile shader
        const program = new cc.GLProgram();
        program.initWithVertexShaderByteArray(VERT_SRC, FRAG_SRC);
        program.link();
        program.updateUniforms();
        this.program = program;
        this._stackMatrix = new cc.kmMat4();

        // Create VBO for triangle
        const w = node.triWidth;
        const h = node.triHeight;
        const vertices = new Float32Array([
          0, h / 2, 0,
          -w / 2, -h / 2, 0,
          w / 2, -h / 2, 0,
        ]);
        this.vbo = this.gl.createBuffer()!;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
      }

      rendering(ctx: WebGLRenderingContext) {
        // console.log('render', ctx)
        const gl = this.gl;
        const node = this.node;
        const program = this.program;

        program.use();
        program.setUniformsForBuiltins();

        const mvp = this._stackMatrix.mat; // node's world matrix
        // console.log(this._renderCmd)
        // const mvp = this._renderCmd._transformWorld.mat;
        const locMVP = program.getUniformLocationForName("u_MVPMatrix");
        gl.uniformMatrix4fv(locMVP, false, mvp);

        const locColor = program.getUniformLocationForName("u_color");
        gl.uniform4fv(locColor, new Float32Array(node._color));

        const posLoc = gl.getAttribLocation(program.getProgram(), "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.disableVertexAttribArray(posLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        cc.g_NumberOfDraws++;
      }
    };

    // trong scene hoặc layer của bạn
    const tri = new TriNode(160, 120, [0.2, 0.7, 1.0, 1.0]); // width, height, rgba
    tri.setPosition(200, 150);
    // tri.setAnchorPoint(0.5, 0.5);
    scene.addChild(tri);
  };
  cc.game.run();
};
