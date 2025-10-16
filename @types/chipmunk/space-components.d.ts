/// <reference path="body.d.ts" />

declare namespace cp {
  export function componentRoot(body: Body): Body;
  export function componentActivate(root: Body): void;
  export function componentAdd(root: Body, body: Body): void;
  export function floodFillComponent(root: Body, body: Body): void;
  export function componentActive(root: Body, threshold: number): boolean;
}