declare namespace cc {
  class ProgressTimer {
    setType(ptt: number)
    constructor(sprite: Sprite)
    static TYPE_BAR: number
    static TYPE_RADIAL: number
    type: number
    percentage: number
    reverseDir: boolean
    /**
     * Midpoint is used to modify the progress start position.
     */
    midPoint: cc.Point
    barChangeRate: cc.Point

    getPercentage(): number
    setPercentage(pc: number): void
    setMidpoint(mpoint: cc.Point): number
    setBarChangeRate(barChangeRate: cc.Point)
  }
}
