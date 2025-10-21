window.onload = function () {
  cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);

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
      // console.log('vertShader', vert)
      // console.log('fragShader', frag)
      let program = new cc.GLProgram();
      program.initWithString(vert, frag);
      // program.initWithVertexShaderByteArray(vert, frag);
      program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
      program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
      program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
      if (!program.link()) {
        console.error("Failed to link shader program");
        return;
      }
      program.updateUniforms();
      // program.setUniformLocationWith1i(program.getUniformLocationForName("u_texture"), 0);
      // set default uniforms (thay sau khi sprite đã có texture)
      const tileScaleLoc = program.getUniformLocationForName("u_tileScale");
      const texSizeLoc = program.getUniformLocationForName("u_texSize");
      const alphaLoc = program.getUniformLocationForName("u_alpha");
      sprite.setContentSize(512, 256);
      sprite.texture._textureLoaded ? afterLoaded() : sprite.texture.addLoadedEventListener(afterLoaded);

      function afterLoaded() {
        // texture size (pixels)
        const texW = sprite.texture.width;
        const texH = sprite.texture.height;
        const size = sprite.getContentSize();
        const scaleX = size.width / texW;
        const scaleY = size.height / texH;
        // tell GL program about these sizes
        // program.use();
        program.setUniformLocationWith2f(texSizeLoc, texW, texH);
        // set tile counts (ví dụ muốn 4 repeats ngang, 3 dọc)
        program.setUniformLocationWith2f(tileScaleLoc, scaleX, scaleY);
        // alpha
        program.setUniformLocationWith1f(alphaLoc, 1.0);
        // gán shader cho sprite
        sprite.setShaderProgram(program);
        // nếu dùng batch node hoặc spriteframe atlas, đảm bảo texture unit đúng
      }
    });

    cc.director.runScene(scene);
  };
  cc.game.run();
};