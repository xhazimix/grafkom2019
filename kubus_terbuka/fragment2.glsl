precision mediump float;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 fTexCoord;

uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 ambientColor;

uniform sampler2D sampler0;

void main() {
  // Menormalisasi vektor normal (lagi),
  //  karena dia terinterpolasi dan ada kemungkinan tidak berpanjang 1
  vec3 normal = normalize(fNormal);

  // Menghitung nilai cos dari sudut antara arah cahaya dan normal
  //  (sama dengan perkalian titik dari vektor arah cahaya dan vektor normal)
  vec3 lightDirection = normalize(lightPosition - fPosition);
  float lightIntensity = max(dot(lightDirection, -normal), 0.0);

  // Fungsi untuk mendapatkan nilai warna dari tekstur
  vec4 tex0 = texture2D(sampler0, fTexCoord);

  float specularPower = 120.0;
  float specular = 0.0;
  if (lightIntensity > 0.0){
    // Melihat vektor
    vec3 viewMatrixVec = vec3(0.0, 0.0, 1.0);

    // vector reflektif
    vec3 reflectVec = reflect(-lightDirection, normal);

    // Inisialisasi specularFactor 
    float specularFactor = max(dot(reflectVec, viewMatrixVec), 0.0);
    specular = pow(specularFactor, specularPower);
  }

  // Menghitung nilai diffuse dari interaksi cahaya dan material
  vec3 diffuse = lightColor * tex0.rgb * lightIntensity + specular;
  
  // Menghitung nilai ambient dari verteks
  vec3 ambient = ambientColor * tex0.rgb;

  gl_FragColor = vec4(diffuse + ambient, 1.0);
}


