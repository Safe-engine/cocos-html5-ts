/// <reference path="./index.d.ts" />

declare namespace cc {
  class GLProgram {
    // Properties
    _programObj
    public constructor(vShaderFileName?: string, fShaderFileName?: string, glContext?: GLProgram);

    // Methods
    initWithString(vShaderFileName?: string, fShaderFileName?: string): boolean;
    initWithVertexShaderByteArray(vShaderFileName?: string, fShaderFileName?: string): boolean;
    link(): boolean;
    addAttribute(attributeName: string, index: number): void;
    updateUniforms(): void;
    getProgram(): GLProgram
    getUniformLocationForName(name: string): WebGLUniformLocation
    addAttribute(name: string, i: number): void
  }
  class GLProgramState {
    // Properties
    public constructor(glprogram: GLProgram);

    // Methods
    setUniformVec2(uniform: string, v1: number, v2: number): void
    setUniformVec2v(uniform: string, value: [number, number]): void
    setUniformVec3(uniform: string, v1: number, v2: number, v3: number): void
    setUniformVec3v(uniform: string, value: [number, number, number]): void
    setUniformVec4(uniform: string, v1: number, v2: number, v3: number, v4: number): void
    setUniformVec4v(uniform: string, value: [number, number, number, number]): void
    setUniformFloat(uniform: string, value: number): void
    setUniformInt(uniform: string, value: number): void
    setPlistFile(string: string): void;
    getGLProgram(): GLProgram
  }
}
