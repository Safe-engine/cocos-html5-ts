/// <reference path="cocos2d-lib.d.ts" />


declare namespace cc {
  class ParticleSystem extends Node {
    // Properties
    plistFile: string;
    public constructor(plistFile: string);

    // Methods
    getPlistFile(): string;
    setPlistFile(string: string): void;
  }
}
