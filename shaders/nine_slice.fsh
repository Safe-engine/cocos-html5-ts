#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main()
{
    vec4 texColor = texture2D(CC_Texture0, v_texCoord);

    // Tăng độ sáng (brightness)
    float brightness = 1.2; // Giá trị >1 làm ảnh sáng hơn, có thể điều chỉnh
    vec3 glowColor = texColor.rgb * brightness;

    // Đảm bảo giá trị không vượt quá 1.0
    glowColor = min(glowColor, vec3(1.0));

    gl_FragColor = vec4(glowColor, texColor.a) * v_fragmentColor;
    // gl_FragColor = texColor * v_fragmentColor;
    // gl_FragColor = vec4(glowColor, 0.0) * v_fragmentColor;
}
