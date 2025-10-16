#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

// uniform sampler2D CC_Texture0;
uniform vec4 u_outlineColor;    // rgba (0..1)
uniform float u_outlineSize;    // outline radius in pixels
uniform vec2 u_textureSize;     // texture size in pixels (width, height)
uniform float u_alphaThreshold; // e.g. 0.01
uniform int u_sampleCount;      // e.g. 16

// random rotation per-pixel optional: not used here

void main() {
  vec4 tex = texture2D(CC_Texture0, v_texCoord);
  float alpha = tex.a;

  // Nếu pixel gốc có alpha lớn hơn threshold -> vẽ sprite bình thường
  if (alpha > u_alphaThreshold) {
    gl_FragColor = tex * v_fragmentColor;
    return;
  }

  // Tính offset step theo UV (1 pixel = 1/textureSize)
  vec2 px = vec2(1.0) / u_textureSize;

  // Chuyển outlineSize (pixel) -> offset length (UV)
  float radiusUV = u_outlineSize;
  // Ta sẽ sample quanh vòng tròn có bán kính radiusUV
  float found = 0.0;

  // Dùng vòng for cố định phải dựa trên u_sampleCount nhỏ (<=32)
  // Ta mô phỏng vòng lặp với int và trig
  for (int i = 0; i < 32; i++) {
    if (i >= u_sampleCount) break;
    float ang = 6.28318530718 * (float(i) / float(u_sampleCount));
    // offset in pixels
    vec2 offsetPx = vec2(cos(ang), sin(ang)) * radiusUV;
    // offset in UV
    vec2 uv = v_texCoord + offsetPx * px;
    vec4 s = texture2D(CC_Texture0, uv);
    if (s.a > u_alphaThreshold) {
      found = 1.0;
      break;
    }
  }

  if (found > 0.5) {
    // vẽ outline color (khi pixel trong vùng outline)
    // có thể dùng alpha mềm bằng cách lấy max neighbor alpha
    gl_FragColor = u_outlineColor;
    return;
  }

  // trong suốt nếu không có outline
  discard;
}
