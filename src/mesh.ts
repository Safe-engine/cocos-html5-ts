window.onload = function () {
  cc.game.onStart = function () {
    class SimpleMeshNode extends cc.Node {
      texture: cc.Texture2D;
      vertices: any;
      uvs: any;
      indices: any;
      _program: cc.GLProgram;
      _vertexBuffer: WebGLBuffer;
      _uvBuffer: WebGLBuffer;
      _indexBuffer: WebGLBuffer;
      _stackMatrix: any;

      constructor(texture, vertices, uvs, indices) {
        super();
        super.ctor()

        // Khởi tạo stack matrix
        this._stackMatrix = new cc.kmMat4();

        // Load texture
        this.texture = texture instanceof cc.Texture2D ? texture : cc.textureCache.addImage(texture);

        // Dữ liệu mesh
        this.vertices = vertices || [];
        this.uvs = uvs || [];
        this.indices = indices || [];

        this.initShader();

        // Đợi texture load xong
        if (!this.texture.isLoaded()) {
          this.texture.addLoadedEventListener(() => {
            this.initBuffers();
          }, this);
        } else {
          this.initBuffers();
        }

        this.scheduleUpdate();
      }

      initShader() {
        const gl: WebGLRenderingContext = cc._renderContext;

        if (!gl) {
          console.error("WebGL context not available");
          return;
        }

        // Tạo shader program thủ công
        this._program = new cc.GLProgram();

        // Initialize với string thay vì byte array
        const result = this._program.initWithString(vertShader, fragShader);

        if (!result) {
          console.error("Failed to init shader program");
          // Thử cách khác
          this._program.initWithVertexShaderByteArray(vertShader, fragShader);
        }

        // Add attributes
        this._program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        this._program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);

        // Link program
        if (!this._program.link()) {
          console.error("Failed to link shader program");
          return;
        }
        // this._program.use();

        // Update uniforms
        this._program.updateUniforms();

        // Verify program
        const program = this._program.getProgram();
        console.log("Shader program created:", program);

        if (program) {
          // Check shader compilation
          // const vertShaderObj = gl.getShaderParameter(this._program._vertShader, gl.COMPILE_STATUS);
          // const fragShaderObj = gl.getShaderParameter(this._program._fragShader, gl.COMPILE_STATUS);
          // console.log("Vertex shader compiled:", vertShaderObj);
          // console.log("Fragment shader compiled:", fragShaderObj);

          // Check program linking
          const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
          console.log("Program linked:", linkStatus);

          if (!linkStatus) {
            const info = gl.getProgramInfoLog(program);
            console.error("Program link error:", info);
          }
        }
      }

      initBuffers() {
        const gl: WebGLRenderingContext = cc._renderContext;

        if (!gl) {
          console.error("WebGL context not available");
          return;
        }
        console.log("Creating buffers...");

        // Tạo và upload VBO
        this._vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        console.log("Vertex buffer created, count:", this.vertices.length / 2);

        this._uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uvs), gl.STATIC_DRAW);
        console.log("UV buffer created, count:", this.uvs.length / 2);

        this._indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
        console.log("Index buffer created, count:", this.indices.length);

        // Unbind
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      }

      visit(ctx) {
        if (!this._visible) {
          return;
        }

        ctx = ctx || cc._renderContext;

        // Push matrix stack
        var currentStack = cc.current_stack;
        currentStack.stack.push(currentStack.top);

        // Khởi tạo _stackMatrix nếu chưa có
        if (!this._stackMatrix) {
          this._stackMatrix = new cc.kmMat4();
        }

        cc.kmMat4Assign(this._stackMatrix, currentStack.top);
        currentStack.top = this._stackMatrix;

        // Apply transform
        var affine = this.nodeToParentTransform();
        const mat4 = new cc.math.Matrix4();

        // Cấu trúc cc.AffineTransform: [a, b, c, d, tx, ty]
        // 2D matrix:
        // [ a,  c,  tx ]
        // [ b,  d,  ty ]
        // [ 0,  0,   1 ]

        mat4.mat = [
          affine.a, affine.b, 0, 0,
          affine.c, affine.d, 0, 0,
          0, 0, 1, 0,
          affine.tx, affine.ty, 0, 1
        ];
        // console.log('currentStack', currentStack, mat4)
        cc.kmMat4Multiply(currentStack.top, currentStack.top, mat4);

        // Draw self
        this.draw(ctx);

        // Visit children
        var children = this._children;
        if (children && children.length > 0) {
          var len = children.length;
          for (var i = 0; i < len; i++) {
            children[i] && children[i].visit(ctx);
          }
        }

        // Pop matrix stack
        currentStack.top = currentStack.stack.pop();
      }

      draw(ctx?) {
        const gl: WebGLRenderingContext = cc._renderContext;

        if (!gl || !this._program || !this._vertexBuffer || !this.texture) {
          return;
        }
        // Get program
        const program = this._program.getProgram();
        if (!program) {
          console.error("Program is null");
          return;
        }

        // Lưu trạng thái GL
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Use shader
        this._program.use();
        this._program._updateProjectionUniform();

        // Bind texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture._webTextureObj);

        // Get uniform/attribute locations
        const posLoc = gl.getAttribLocation(program, "a_position");
        const uvLoc = gl.getAttribLocation(program, "a_texCoord");
        const mvpLoc = gl.getUniformLocation(program, "u_MVPMatrix");
        const texLoc = gl.getUniformLocation(program, "CC_Texture0");

        if (posLoc === -1 || uvLoc === -1) {
          console.error("Attribute location not found - pos:", posLoc, "uv:", uvLoc);
          return;
        }

        // Set uniforms
        if (mvpLoc) {
          gl.uniformMatrix4fv(mvpLoc, false, cc.current_stack.top.mat);
        }
        if (texLoc) {
          gl.uniform1i(texLoc, 0);
        }

        // Bind vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        // Bind UV buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.enableVertexAttribArray(uvLoc);
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

        // Bind index buffer and draw
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);

        // Check for errors
        var error = gl.getError();
        if (error !== gl.NO_ERROR) {
          console.error("WebGL Error:", error);
        }

        // Cleanup
        gl.disableVertexAttribArray(posLoc);
        gl.disableVertexAttribArray(uvLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
      }

      onExit() {
        const gl: WebGLRenderingContext = cc._renderContext;
        if (gl) {
          if (this._vertexBuffer) gl.deleteBuffer(this._vertexBuffer);
          if (this._uvBuffer) gl.deleteBuffer(this._uvBuffer);
          if (this._indexBuffer) gl.deleteBuffer(this._indexBuffer);
        }
        super.onExit && super.onExit();
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
    const textureName = 'res/frame.png'
    cc.loader.load([
      textureName,
    ], function () {
      const tex = cc.textureCache.addImage(textureName);
      const vertices = [
        -50, -50,  // bottom-left
        50, -50,  // bottom-right
        50, 50,  // top-right
        -50, 50   // top-left
      ];

      // UV coordinates (0,0 là góc trên bên trái của texture)
      const uvs = [
        0, 1,  // bottom-left
        1, 1,  // bottom-right
        1, 0,  // top-right
        0, 0   // top-left
      ];

      // Indices cho 2 triangles tạo thành quad
      const indices = [
        0, 1, 2,  // triangle 1
        0, 2, 3   // triangle 2
      ];
      const meshNode = new SimpleMeshNode(textureName, vertices, uvs, indices);
      meshNode.setPosition(200, 200);
      // meshNode.setAnchorPoint(0.5, 0.5);
      // meshNode.setRotation(30);
      scene.addChild(meshNode);
    });

    cc.director.runScene(scene);
  };
  cc.game.run();
};