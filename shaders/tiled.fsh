// fragment.fsh
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

uniform sampler2D u_texture;

// number of tiles across (e.g. vec2(3.0, 2.0) => 3x horizontally, 2x vertically)
uniform vec2 u_tileScale;

// size of the texture in pixels (width, height)
uniform vec2 u_texSize;

// optional global alpha multiplier
uniform float u_alpha;

void main()
{
    // scale UV to tile space
    vec2 uv = v_texCoord * u_tileScale;

    // wrap using fract
    vec2 uvw = fract(uv);

    // avoid linear-filter seams: push UVs slightly away from exact 0.0/1.0 edges
    // compute texel size in uv-space
    vec2 texel = 1.0 / u_texSize;

    // shrink usable range slightly to avoid sampling border when linear filter is used
    // the factor 1.0 - 2.0*texel moves the uv into [texel, 1-texel]
    uvw = uvw * (1.0 - 2.0 * texel) + texel;

    vec4 color = texture2D(u_texture, uvw);

    gl_FragColor = color * v_fragmentColor * u_alpha;
}
