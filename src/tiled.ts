window.onload = function () {
  cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);
    class TiledSpriteNode extends cc.Sprite {
      _program: cc.GLProgram
      _tileScaleLoc: WebGLUniformLocation
      _texSizeLoc: WebGLUniformLocation
      _texLoc: WebGLUniformLocation

      constructor(file, tieldFsh, tiledVsh) {
        super()
        super.ctor(file)
        this.initShader(tieldFsh, tiledVsh)
      }

      initShader(tieldFsh, tiledVsh) {
        const program = new cc.GLProgram()
        program.initWithVertexShaderByteArray(tiledVsh, tieldFsh)
        program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION)
        program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR)
        program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS)
        program.link()
        program.updateUniforms()

        program.use()
        this._program = program
        this.setShaderProgram(program)

        // Lưu lại uniform location để update nhanh
        this._tileScaleLoc = program.getUniformLocationForName('u_tileScale')
        this._texSizeLoc = program.getUniformLocationForName('u_texSize')
        this._texLoc = program.getUniformLocationForName('u_texture')

        this.scheduleUpdate()
      }

      updateShaderUniforms() {
        if (!this._program || !this.texture || !this.texture.isLoaded()) return

        const texW = this.texture.width
        const texH = this.texture.height
        const size = this.getContentSize()

        const scaleX = size.width / texW
        const scaleY = size.height / texH

        this._program.use()
        this._program.setUniformLocationWith2f(this._tileScaleLoc, scaleX, scaleY)
        this._program.setUniformLocationWith2f(this._texSizeLoc, texW, texH)
        this._program.setUniformLocationWith1i(this._texLoc, 0)
      }

      setContentSize(w, h) {
        super.setContentSize(w, h)
        this.updateShaderUniforms()
      }
    }

    let scene = new cc.Scene();
    let layer = new cc.Layer();
    scene.addChild(layer);

    cc.loader.load([
      "res/frame.png",
      "shaders/tiled.vsh",
      "shaders/tiled.fsh",
    ], function () {
      let sprite = new cc.Sprite("res/frame.png");
      let texture = sprite.getTexture();
      console.log('texture', texture.getContentSize())
      if (!texture || texture.getContentSize().width === 0) {
        console.error("Texture chưa sẵn sàng, không thể set shader.");
        return;
      }
      sprite.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
      //   sprite.setScale(2);
      layer.addChild(sprite);
      let vert = cc.loader.getRes("shaders/tiled.vsh");
      let frag = cc.loader.getRes("shaders/tiled.fsh");
      const tiled = new TiledSpriteNode("res/frame.png", frag, vert)
      tiled.setContentSize(1111, 556);
      tiled.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
      layer.addChild(tiled);
    });

    cc.director.runScene(scene);
  };
  cc.game.run();
};