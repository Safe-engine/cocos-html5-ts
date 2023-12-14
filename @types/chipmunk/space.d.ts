/// <reference path="arbiter.d.ts" />
/// <reference path="bb.d.ts" />
/// <reference path="body.d.ts" />
/// <reference path="collision.d.ts" />
/// <reference path="constraints/constraint.d.ts" />
/// <reference path="shapes.d.ts" />
/// <reference path="spatial-index.d.ts" />
/// <reference path="vect.d.ts" />

namespace cp {
  export declare class Space {
    stamp: number;
    dtCurr: number;
    bodies: Body[];
    rousedBodies: Body[];
    sleepingComponents: Body[];
    spatialIndex: SpatialIndex;
    arbiters: Arbiter[];
    cachedArbiters: Map<string, Arbiter>;
    constraints: Constraint[];
    locked: number;
    collisionHandlers: Map<string, CollisionHandler>;
    defaultHandler: CollisionHandler;
    postStepCallbacks: Array<() => any>;
    iterations: number;
    gravity: Vect;
    damping: number;
    idleSpeedThreshold: number;
    sleepTimeThreshold: number;
    collisionSlop: number;
    collisionBias: number;
    collisionPersistence: number;
    enableContactGraph: boolean;
    staticBody: Body;
    collideShapes: (a: Shape, b: Shape) => void;
    constructor();
    getCurrentTimeStep(): number;
    setIterations(iter: number): void;
    isLocked(): boolean;
    addCollisionHandler(a: number, b: number, begin: (arg: Arbiter, space: Space) => any, preSolve: (arg: Arbiter, space: Space) => any, postSolve: (arg: Arbiter, space: Space) => any, separate: (arg: Arbiter, space: Space) => any): void;
    removeCollisionHandler(a: number, b: number): void;
    setDefaultCollisionHandler(begin: (arg: Arbiter, space: Space) => any, preSolve: (arg: Arbiter, space: Space) => any, postSolve: (arg: Arbiter, space: Space) => any, separate: (arg: Arbiter, space: Space) => any): void;
    lookupHandler(a: number, b: number): CollisionHandler;
    addShape(shape: Shape): Shape;
    addStaticShape(shape: Shape): Shape;
    addBody(body: Body): Body;
    addConstraint(constraint: Constraint): Constraint;
    filterArbiters(body: Body, filter: Shape): void;
    removeShape(shape: Shape): void;
    removeStaticShape(shape: Shape): void;
    removeBody(body: Body): void;
    removeConstraint(constraint: Constraint): void;
    containsShape(shape: Shape): boolean;
    containsBody(body: Body): boolean;
    containsConstraint(constraint: Constraint): boolean;
    uncacheArbiter(arb: Arbiter): void;
    eachBody(func: (body: Body) => any): void;
    eachShape(func: (shape: Shape) => any): void;
    eachConstraint(func: (constraint: Constraint) => any): void;
    reindexStatic(): void;
    reindexShape(shape: Shape): void;
    reindexShapesForBody(body: Body): void;
    activateBody(body: Body): void;
    deactivateBody(body: Body): void;
    processComponents(dt: number): void;
    activateShapesTouchingShape(shape: Shape): void;
    pointQuery(point: Vect, layers: number, group: number, func: (shape: Shape) => any): void;
    pointQueryFirst(point: Vect, layers: number, group: number): Shape;
    nearestPointQuery(point: Vect, maxDistance: number, layers: number, group: number, func: (shape: Shape, d: number, p: Vect) => any): void;
    nearestPointQueryNearest(point: Vect, maxDistance: number, layers: number, group: number): NearestPointQueryInfo;
    segmentQuery(start: Vect, end: Vect, layers: number, group: number, func: (shape: Shape, t: number, n: Vect) => any): void;
    segmentQueryFirst(start: Vect, end: Vect, layers: number, group: number): SegmentQueryInfo;
    bbQuery(bb: BB, layers: number, group: number, func: (shape: Shape) => any): void;
    shapeQuery(shape: Shape, func: (shape: Shape, contacts: Contact[]) => any): boolean;
    addPostStepCallback(func: () => any): void;
    runPostStepCallbacks(): void;
    lock(): void;
    unlock(runPostStep: boolean): void;
    makeCollideShapes(): (a: Shape, b: Shape) => void;
    arbiterSetFilter(arb: Arbiter): boolean;
    step(dt: number): void;
  }
}