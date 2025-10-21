/// <reference path="./index.d.ts" />

declare namespace cc {
  class GLProgram {
    // Properties
    _programObj
    _vertShader: WebGLShader
    _fragShader: WebGLShader
    public constructor(vShaderFileName?: string, fShaderFileName?: string, glContext?: GLProgram);

    // Methods
    initWithString(vShaderFileName?: string, fShaderFileName?: string): boolean;
    initWithVertexShaderByteArray(vShaderFileName?: string, fShaderFileName?: string): boolean;
    link(): boolean;
    addAttribute(attributeName: string, index: number): void;
    updateUniforms(): void;
    getProgram(): WebGLProgram
    getUniformLocationForName(name: string): WebGLUniformLocation
    addAttribute(name: string, i: number): void
    _updateProjectionUniform(): void
    use(): void
    setUniformsForBuiltins(): void
    setUniformLocationWith1i(location: WebGLUniformLocation | string, i: number)
    setUniformLocationWith2f(location: WebGLUniformLocation | string, f1: number, f2: number)
    setUniformLocationWith1f(location: WebGLUniformLocation | string, f: number)
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
