#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

uniform sampler2D u_texture;
uniform vec2 u_tileScale;
uniform vec2 u_texSize;

void main() {
    vec2 uv = v_texCoord * u_tileScale;
    vec2 wrappedUV = fract(uv);

    vec2 texel = 1.0 / u_texSize;
    wrappedUV = wrappedUV * (1.0 - 2.0 * texel) + texel;

    vec4 color = texture2D(u_texture, wrappedUV);
    gl_FragColor = color * v_fragmentColor;
}
