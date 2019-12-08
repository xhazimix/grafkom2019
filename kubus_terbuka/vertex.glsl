precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;

varying vec3 fColor;
varying vec3 fPosition;
varying vec3 fNormal;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 perspectiveMatrix;

uniform mat3 normalMatrix; // Membantu transformasi vektor normal

uniform float scale;
uniform float middle;
uniform vec3 bounce;

void main() {
  mat4 to_origin = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -2.0, 1.0 
  );

  mat4 bounce = mat4(
    1.0, 0.0, 0.0, bounce.x,
    0.0, 1.0, 0.0, bounce.y,
    0.0, 0.0, 1.0, bounce.z,
    0.0, 0.0, 0.0, 1.0
  );

  vec4 middleVec = vec4(middle, 0.0, 0.0, 1.0);

  mat4 skalasi = mat4(
    scale, 0.0, 0.0, -(middleVec.x) * scale + (middleVec.x),
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = perspectiveMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
 
  fColor = vColor;
  fPosition = vec3(viewMatrix * modelMatrix * vec4(vPosition, 1.0));
  fNormal = normalMatrix * vNormal;
}
