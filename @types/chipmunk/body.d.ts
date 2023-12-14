/// <reference path="space.d.ts" />
/// <reference path="arbiter.d.ts" />
/// <reference path="constraints.d.ts" />
/// <reference path="shapes.d.ts" />
/// <reference path="vect.d.ts" />

namespace cp {
  export declare class Body {
    p: Vect;
    v: Vect;
    f: Vect;
    a: number;
    w: number;
    t: number;
    rot: Vect;
    vLimit: number;
    wLimit: number;
    vBias: Vect;
    wBias: number;
    space: Space;
    shapeList: Shape[];
    arbiterList: Arbiter;
    constraintList: Constraint;
    nodeRoot: Body;
    nodeNext: Body;
    nodeIdleTime: number;
    mass: number;
    massInv: number;
    inertia: number;
    inertiaInv: number;
    data: any;
    constructor(m: number, i: number);
    getPos(): Vect;
    getVel(): Vect;
    getAngVel(): number;
    isSleeping(): boolean;
    isStatic(): boolean;
    isRogue(): boolean;
    setMass(mass: number): void;
    setMoment(moment: number): void;
    addShape(shape: Shape): void;
    removeShape(shape: Shape): void;
    removeConstraint(constraint: Constraint): void;
    setPos(pos: Vect): void;
    setVel(vel: Vect): void;
    setAngVel(w: number): void;
    setAngleInternal(angle: number): void;
    setAngle(angle: number): void;
    velocity_func(gravity: Vect, damping: number, dt: number): void;
    position_func(dt: number): void;
    resetForces(): void;
    applyForce(force: Vect, r: Vect): void;
    applyImpulse(impulse: Vect, r: Vect): void;
    getVelAtPoint(r: Vect): Vect;
    getVelAtWorldPoint(point: Vect): Vect;
    getVelAtLocalPoint(point: Vect): Vect;
    eachShape(func: (shape: Shape) => void): void;
    eachConstraint(func: (constraint: Constraint) => void): void;
    eachArbiter(func: (arbiter: Arbiter) => void): void;
    local2World(v: Vect): Vect;
    world2Local(v: Vect): Vect;
    kineticEnergy(): number;
    sanityCheck(): void;
    activate(): void;
    activateStatic(filter: Shape): void;
    pushArbiter(arb: Arbiter): void;
    sleep(): void;
    sleepWithGroup(group: Body): void;
  }
  export declare function createStaticBody(): Body;
}