window.onload = function () {
  cc.game.onStart = function () {
    const width = 720
    const height = 1280
    const policy = width > height ? cc.ResolutionPolicy.FIXED_HEIGHT : cc.ResolutionPolicy.FIXED_WIDTH
    cc.view.setDesignResolutionSize(width, height, policy)
    class MotionStreakScene extends cc.Scene {
      declare streak: cc.MotionStreak
      constructor() {
        super()
        super.init()
        const motionStreak = new cc.MotionStreak(1, 32, 13, cc.color(0, 255, 0, 255), 'res/particle.png')
        console.log('BootScene constructor', motionStreak)
        motionStreak.setPosition(300, 400)
        this.addChild(motionStreak)
        this.streak = motionStreak
        this.scheduleUpdate()
      }
      update(dt: number) {
        // console.log('BootScene update', dt)
        this.streak.setPositionY(this.streak.getPositionY() + dt * 500)
        if (this.streak.getPositionY() > cc.director.getWinSize().height) {
          this.streak.reset()
          this.streak.setPositionY(0)
        }
      }
    }

    cc.director.runScene(new MotionStreakScene());
  };
  cc.game.run();
};
