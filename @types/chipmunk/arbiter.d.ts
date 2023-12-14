/// <reference path="body.d.ts" />
/// <reference path="collision.d.ts" />
/// <reference path="shapes.d.ts" />
/// <reference path="space.d.ts" />
/// <reference path="vect.d.ts" />

namespace cp {
  export declare class ContactPoint {
    point: Vect;
    normal: Vect;
    dist: number;
    constructor(point: Vect, normal: Vect, dist: number);
  }
  export declare class CollisionHandler {
    a: number;
    b: number;
    constructor();
    begin(arb: Arbiter, space: Space): boolean;
    preSolve(arb: Arbiter, space: Space): boolean;
    postSolve(arb: Arbiter, space: Space): void;
    separate(arb: Arbiter, space: Space): void;
  }
  export declare type ArbiterState = ("first-coll" | "normal" | "ignore" | "cached");
  export declare class Arbiter {
    e: number;
    u: number;
    vrSurface: Vect;
    a: Shape;
    body_a: Body;
    b: Shape;
    body_b: Body;
    threadNextA: Arbiter;
    threadPrevA: Arbiter;
    threadNextB: Arbiter;
    threadPrevB: Arbiter;
    contacts: Contact[];
    stamp: number;
    handler: CollisionHandler;
    swappedColl: boolean;
    state: ArbiterState;
    constructor(a: Shape, b: Shape);
    getShapes(): [Shape, Shape];
    totalImpulse(): Vect;
    totalImpulseWithFriction(): Vect;
    totalKE(): number;
    ignore(): void;
    getA(): Shape;
    getB(): Shape;
    isFirstContact(): boolean;
    getContactPointSet(): ContactPoint[];
    getNormal(i: number): Vect;
    getPoint(i: number): Vect;
    getDepth(i: number): number;
    unthread(): void;
    update(contacts: Contact[], handler: CollisionHandler, a: Shape, b: Shape): void;
    preStep(dt: number, slop: number, bias: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    callSeparate(space: Space): void;
    next(body: Body): Arbiter;
  }
}