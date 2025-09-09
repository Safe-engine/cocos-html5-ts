/// <reference path="./index.d.ts" />

declare namespace cc {
  class MotionStreak extends Node {
    // Properties
    fastMode: boolean;
    public constructor(fade: number, minSeg: number, stroke: number, color: Color, texture: string);

    // Methods
    isFastMode(): boolean;
    setFastMode(fastMode: boolean): void;
    reset(): void;
    getStroke(): number;
    setStroke(stroke: number): void
  }
}
