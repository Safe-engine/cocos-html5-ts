window.onload = function () {
  cc.game.onStart = function () {
    const width = 720
    const height = 1280
    const policy = width > height ? cc.ResolutionPolicy.FIXED_HEIGHT : cc.ResolutionPolicy.FIXED_WIDTH
    cc.view.setDesignResolutionSize(width, height, policy)
    class GraphicsTest extends cc.Scene {
      onEnter() {
        super.onEnter()
        const draw = new cc.DrawNode()
        this.createSpriteSafe()
        this.addChild(draw, 1)
        draw.drawRect(cc.p(100, 300), cc.p(200, 500), cc.color(255, 0, 0, 120), 0)
        // draw.drawDot(cc.p(300, 1500), 50)
        // const draw2 = new cc.DrawNode()
        // this.addChild(draw2)
        // const points = [cc.p(40, 1040), cc.p(540, 640), cc.p(840, 940), cc.p(740, 1040)]
        // draw2.drawPoly(points, cc.Color.BLUE, 20, cc.Color.GREEN)
        // draw2.drawRect(cc.p(600, 110), cc.p(350, 245), cc.Color.RED, 5, cc.Color.WHITE)
      }

      createSpriteSafe() {
        const sprite = new cc.Sprite('res/frame.png')
        sprite.setColor(cc.color(255, 0, 0))
        sprite.setPosition(300, 400)
        this.addChild(sprite, 10)
      }
    }

    cc.director.runScene(new GraphicsTest());
  };
  cc.game.run();
};