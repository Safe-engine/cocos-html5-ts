/// <reference path="bb.d.ts" />
/// <reference path="shapes.d.ts" />
/// <reference path="vect.d.ts" />
/**
 * @defgroup cpSpatialIndex cpSpatialIndex
 *
 * Spatial indexes are data structures that are used to accelerate collision
 * detection and spatial queries. Chipmunk provides a number of spatial index
 * algorithms to pick from and they are programmed in a generic way so that you
 * can use them for holding more than just Shapes.
 *
 * It works by using pointers to the objects you add and using a callback to ask
 * your code for bounding boxes when it needs them. Several types of queries can
 * be performed an index as well as reindexing and full collision information.
 * All communication to the spatial indexes is performed through callback
 * functions.
 *
 * Spatial indexes should be treated as opaque structs. This means you shouldn't
 * be reading any of the fields directly.
 */

namespace cp {
  export declare abstract class SpatialIndex {
    count: number;
    abstract contains(shape: Shape): boolean;
    abstract insert(shape: Shape): void;
    abstract insertStatic(shape: Shape): void;
    abstract remove(shape: Shape): void;
    reindexShape(shape: Shape): void;
    reindex(): void;
    reindexStatic(): void;
    abstract touchingQuery(func: (a: Shape, b: Shape) => any): void;
    abstract pointQuery(point: Vect, func: (shape: Shape) => any): void;
    abstract segmentQuery(vectA: Vect, vectB: Vect, tExit: number, func: (shape: Shape) => any): void;
    abstract query(bb: BB, func: (shape: Shape) => any): void;
    abstract each(f: (shape: Shape) => any): void;
  }
}