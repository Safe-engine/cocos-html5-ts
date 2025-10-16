/// <reference path="bb.d.ts" />
/// <reference path="shapes.d.ts" />
/// <reference path="spatial-index.d.ts" />
/// <reference path="vect.d.ts" />

declare namespace cp {
  export class BBTreeIndex extends SpatialIndex {
    private tree;
    private activeShapes;
    insertStatic(shape: Shape): void;
    insert(shape: Shape): void;
    remove(shape: Shape): void;
    contains(shape: Shape): boolean;
    reindexStatic(): void;
    reindex(): void;
    reindexShape(shape: Shape): void;
    touchingQuery(func: (a: Shape, b: Shape) => any): void;
    pointQuery(v: Vect, func: (shape: Shape) => any): void;
    segmentQuery(a: Vect, b: Vect, tExit: number, func: (shape: Shape) => any): void;
    query(bb: BB, func: (shape: Shape) => any): void;
    each(func: (shape: Shape) => any): void;
  }
}