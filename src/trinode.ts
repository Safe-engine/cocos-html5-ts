window.onload = function () {
  cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);
    let scene = new cc.Scene();
    cc.director.runScene(scene);
    // Tạo sprite với shader tùy chỉnh
    var triangleSprite = new cc.Sprite("res/zebra.png");
    triangleSprite.setPosition(200, 150);
    // triangleSprite.setContentSize(300, 300);

    // Vertex shader
    var vertShader = `
                        attribute vec4 a_position;
                        attribute vec2 a_texCoord;
                        varying vec2 v_texCoord;

                        void main() {
                            gl_Position = CC_PMatrix * a_position;
                            v_texCoord = a_texCoord;
                        }
                    `;

    // Fragment shader - vẽ tam giác
    var fragShader = `
                        #ifdef GL_ES
                        precision mediump float;
                        #endif

                        varying vec2 v_texCoord;
                        uniform float u_time;

                        void main() {
                            vec2 uv = v_texCoord;

                            // Định nghĩa 3 đỉnh tam giác
                            vec2 v1 = vec2(0.5, 0.8);  // Đỉnh trên
                            vec2 v2 = vec2(0.2, 0.2);  // Đỉnh trái dưới
                            vec2 v3 = vec2(0.8, 0.2);  // Đỉnh phải dưới

                            // Tính toán barycentric coordinates
                            float d1 = sign((uv.x - v2.x) * (v1.y - v2.y) - (v1.x - v2.x) * (uv.y - v2.y));
                            float d2 = sign((uv.x - v3.x) * (v2.y - v3.y) - (v2.x - v3.x) * (uv.y - v3.y));
                            float d3 = sign((uv.x - v1.x) * (v3.y - v1.y) - (v3.x - v1.x) * (uv.y - v1.y));

                            // Kiểm tra nếu điểm nằm trong tam giác
                            bool inside = (d1 >= 0.0) && (d2 >= 0.0) && (d3 >= 0.0);

                            if (inside) {
                                // Màu gradient dựa trên vị trí và thời gian
                                vec3 color1 = vec3(1.0, 0.3, 0.5);
                                vec3 color2 = vec3(0.3, 0.8, 1.0);
                                vec3 color = mix(color1, color2, uv.y + sin(u_time) * 0.2);

                                gl_FragColor = vec4(color, 1.0);
                            } else {
                                discard; // Bỏ qua pixel ngoài tam giác
                            }
                        }
                    `;

    // Tạo shader program
    var program = new cc.GLProgram();
    program.initWithString(vertShader, fragShader);
    program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
    program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
    program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    program.link();
    program.updateUniforms();

    // Lưu location của uniform
    var timeLocation = program.getUniformLocationForName("u_time");
    var time = 0;

    // Áp dụng shader
    triangleSprite.setShaderProgram(program);

    // Update thời gian để tạo hiệu ứng động
    triangleSprite.scheduleUpdate();
    triangleSprite.update = function (dt) {
      // console.log('update')
      time += dt;
      program.use();
      program.setUniformLocationWith1f(timeLocation, time);
    };

    scene.addChild(triangleSprite);
  };
  cc.game.run();
};
