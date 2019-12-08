precision mediump float;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec2 vTexCoord;

varying vec2 fTexCoord;
varying vec3 fPosition;
varying vec3 fNormal;

uniform mat4 perspectiveMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform mat3 normalMatrix;

void main() {
  gl_Position = perspectiveMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);

  fTexCoord = vTexCoord;
  fPosition = vec3(viewMatrix * modelMatrix * vec4(vPosition, 1.0));
  fNormal = normalMatrix * vNormal;
}
 