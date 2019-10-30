precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;
uniform float scale;
uniform vec3 translate;
uniform float middle_coordinates;
uniform mat4 projection;
uniform mat4 view;

void main() {
  fColor = vColor;
  gl_Position = vec4(vPosition, 0.0, 1.0); 

  mat4 translation_perspective = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -2.0, 1.0
  );

  mat4 translation = mat4(
    1, 0, 0, translate.x,
    0, 1, 0, translate.y,
    0, 0, 1, translate.z,
    0, 0, 0, 1
  );

  vec3 angle = radians(theta);
  vec3 c = cos(angle);
  vec3 s = sin(angle);

  mat4 rx = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, c.x, s.x, 0.0,
    0.0, -s.x, c.x, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 ry = mat4(
    c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rz = mat4(
    c.z, s.z, 0.0, 0.0,
    -s.z, c.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  vec4 rotated_position = vec4(vPosition, 0.0, 1.0);
  vec4 middle_x = vec4(middle_coordinates, 0.0, 0.0, 1.0);
  vec4 middle_v = middle_x;

  mat4 scalation = mat4(
    0.2,  0,    0,  0,
    0,    0.2,  0,  0,
    0,    0,    1,  0,
    0,    0,    0,  1.
  );

  mat4 pseudo_rotate = mat4(
    scale,  0, 0, -(middle_v.x)*scale + middle_v.x,
    0,      1, 0, 0,
    0,      0, 1, 0,
    0,      0, 0, 1
  );

  vec4 final_position = rotated_position * translation * pseudo_rotate * scalation;
  gl_Position = projection * view * translation_perspective * final_position;
}
