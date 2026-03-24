window.onload = function () {
  cc.game.onStart = function () {
    const width = 720
    const height = 1280
    const policy = width > height ? cc.ResolutionPolicy.FIXED_HEIGHT : cc.ResolutionPolicy.FIXED_WIDTH
    cc.view.setDesignResolutionSize(width, height, policy)
    class ParticleScene extends cc.Scene {
      onEnter() {
        super.onEnter()
        const { width, height } = cc.director.getWinSize()
        cc.loader.load(['res/Spiral.plist', 'res/SmallSun.plist', 'res/particle.png'], (err: any, resources: any) => {
          console.log(err, resources)
          const emitter = new cc.ParticleSystem('res/Spiral.plist')
          emitter.setPosition(width / 2, height / 3)
          this.addChild(emitter)
          const sun = new cc.ParticleSystem('res/SmallSun.plist')
          sun.setPosition(width / 2, height * 0.8)
          this.addChild(sun)
          const firework = new (cc as any).ParticleFireworks()
          firework.setPosition(width / 3, height / 2)
          const texture = cc.textureCache.getTextureForKey('res/particle.png')!
          firework.setTexture(texture)
          this.addChild(firework)
          console.log(firework)
        })
      }
    }

    cc.director.runScene(new ParticleScene());
  };
  cc.game.run();
};