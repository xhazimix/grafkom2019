precision mediump float;

varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 ambientColor;
uniform float shininess;

void main() {
  // Menormalisasi vektor normal (lagi),
  //  karena dia terinterpolasi dan ada kemungkinan tidak berpanjang 1
  vec3 normal = normalize(fNormal);

  // Menghitung nilai cos dari sudut antara arah cahaya dan normal
  //  (sama dengan perkalian titik dari vektor arah cahaya dan vektor normal)
  vec3 lightDirection = normalize(lightPosition - fPosition);
  float lightIntensity = clamp(dot(normal, lightDirection), 0.0, 1.0);

// Menghitung nilai ambient dari verteks
  vec3 ambient = ambientColor * fColor;

  // Menghitung nilai diffuse dari interaksi cahaya dan material
  vec3 diffuse = fColor * lightIntensity;

  vec3 reflection = normalize(2.0 * dot(normal, lightDirection) * normal - lightDirection);
  vec3 to_camera = normalize(-1.0 * fPosition);

  lightIntensity = clamp(dot(reflection, to_camera), 0.0, 1.0);
  lightIntensity = pow(lightIntensity, shininess);

  //specular light
  vec3 specular;
  if (lightIntensity > 0.0){
    specular = lightColor * lightIntensity;
    diffuse = diffuse * (1.0 - lightIntensity);
  }else{
    specular = vec3(0.0, 1.0, 0.0);
  }

  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}

