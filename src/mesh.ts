window.onload = function () {
  cc.game.onStart = function () {
    class SimpleMeshNode extends cc.Node {
      texture: cc.Texture2D;
      vertices: any;
      uvs: any;
      indices: any;
      _program: cc.GLProgram;
      constructor(texture, vertices, uvs, indices) {
        super();
        super.ctor()
        this.texture = texture instanceof cc.Texture2D ? texture : cc.textureCache.addImage(texture);

        // Dữ liệu mesh
        this.vertices = vertices || [];  // [x, y, x, y, ...]
        this.uvs = uvs || [];            // [u, v, u, v, ...]
        this.indices = indices || [];    // [i1, i2, i3, ...]

        this._program = new cc.GLProgram();
        this._program.initWithVertexShaderByteArray(vertShader, fragShader);
        this._program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        this._program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
        this._program.link();
        this._program.updateUniforms();
      }

      draw(renderer) {
        super.draw(renderer)
        const gl: WebGLRenderingContext = cc._renderContext;
        cc.glUseProgram(this._program.getProgram());

        cc.glBindTexture2D(this.texture);

        const posLoc = gl.getAttribLocation(this._program, cc.ATTRIBUTE_NAME_POSITION);
        const uvLoc =  gl.getAttribLocation(this._program, cc.ATTRIBUTE_NAME_TEX_COORD);
        const uMVP = this._program.getUniformLocationForName("u_MVPMatrix");

        gl.uniformMatrix4fv(uMVP, false, this.getNodeToWorldTransform());

        // VBO tạm thời
        const vertexData = new Float32Array(this.vertices);
        const uvData = new Float32Array(this.uvs);
        const indexData = new Uint16Array(this.indices);

        gl.enableVertexAttribArray(posLoc);
        gl.enableVertexAttribArray(uvLoc);

        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

        gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);
      }
      _super(renderer: any, transform: any, flags: any) {
        throw new Error("Method not implemented.");
      }
    }
    const vertShader = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform mat4 u_MVPMatrix;
varying vec2 v_texCoord;
void main() {
    gl_Position = u_MVPMatrix * vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
}
`;

    const fragShader = `
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
// uniform sampler2D CC_Texture0;
void main() {
    gl_FragColor = texture2D(CC_Texture0, v_texCoord);
}
`;


    cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);

    let scene = new cc.Scene();
    let layer = new cc.Layer();
    scene.addChild(layer);

    cc.loader.load([
      "res/frame.png",
    ], function () {
      const tex = cc.textureCache.addImage("res/frame.png");
      const meshNode = new SimpleMeshNode(
        tex,
        [0, 0, 100, 0, 100, 100, 0, 100],
        [0, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 2, 0, 2, 3]
      );
      meshNode.setPosition(200, 200);
      meshNode.setAnchorPoint(0.5, 0.5);
      meshNode.setRotation(30);
      scene.addChild(meshNode);
    });

    cc.director.runScene(scene);
  };
  cc.game.run();
};