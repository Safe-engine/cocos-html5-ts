/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Constraint } from "./constraint";
namespace cp {
  export declare class DampedRotarySpring extends Constraint {
    restAngle: number;
    stiffness: number;
    damping: number;
    springTorqueFunc: (spring: DampedRotarySpring, relativeAngle: number) => number;
    targetNormalRelativeRate: number;
    dragCoef: number;
    iSum: number;
    constructor(a: Body, b: Body, restAngle: number, stiffness: number, damping: number);
    preStep(dt: number): void;
    applyImpulse(): void;
  }
}