window.onload = function () {
  cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);

    let scene = new cc.Scene();
    let layer = new cc.Layer();
    scene.addChild(layer);

    cc.loader.load([
      "res/frame.png",
      "shaders/outline.vsh",
      "shaders/outline.fsh",
      // "shaders/default.vsh",
      // "shaders/nine_slice.fsh"
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

      let vert = cc.loader.getRes("shaders/outline.vsh");
      let frag = cc.loader.getRes("shaders/outline.fsh");
      // console.log('vertShader', vert)
      // console.log('fragShader', frag)
      let program = new cc.GLProgram();
      program.initWithString(vert, frag);
      // program.initWithVertexShaderByteArray(vert, frag);
      program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
      program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
      program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
      // Add this after program.link()
      if (!program.link()) {
        console.error("Failed to link shader program");
        return;
      }
      // program.use();
      console.log('program', program)
      program.updateUniforms();

      const glProgState = new cc.GLProgramState(program);
      const tex = sprite.getTexture();
      const texW = tex.getPixelsWide();
      const texH = tex.getPixelsHigh();
      glProgState.setUniformVec4v("u_outlineColor", [1, 0, 0.4, 1]);
      glProgState.setUniformFloat("u_outlineSize", 12);
      glProgState.setUniformVec2v("u_textureSize", [texW, texH]);
      glProgState.setUniformFloat("u_alphaThreshold", 0.01);
      glProgState.setUniformInt("u_sampleCount", 16);
      console.log('glProgState', glProgState)
      sprite.setGLProgramState(glProgState);
    });

    cc.director.runScene(scene);
  };
  cc.game.run();
};