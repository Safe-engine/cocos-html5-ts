#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
// uniform sampler2D CC_Texture0;
uniform vec2 u_resolution;
uniform vec4 u_outlineColor; // viền RGBA
uniform float u_thickness;   // độ dày viền (pixel)

void main() {
    float alpha = 0.0;
    vec4 baseColor = texture2D(CC_Texture0, v_texCoord);

    // Lấy mẫu texture tại 8 hướng xung quanh
    for (float x = -1.0; x <= 1.0; x++) {
        for (float y = -1.0; y <= 1.0; y++) {
            if (x == 0.0 && y == 0.0) continue;
            vec2 offset = vec2(x, y) * u_thickness / u_resolution;
            alpha = max(alpha, texture2D(CC_Texture0, v_texCoord + offset).a);
        }
    }

    // Nếu pixel hiện tại trong suốt nhưng xung quanh có alpha > 0 thì là viền
    if (baseColor.a < 0.1 && alpha > 0.0) {
        gl_FragColor = u_outlineColor;
    } else {
        gl_FragColor = baseColor;
    }
}
