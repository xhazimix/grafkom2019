(function(global) {

  var theta = 0.0, scale = 1, membesar = 1.0; 

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    //resize the canvas to fill browser window dynamically
    //window.addEventListener('resize', resizer);

    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
    
    var line1 = [
      +0.125, -0.3,   1.0, 0.0, 0.0,
      0.0, -0.2,      1.0, 0.0, 0.0,
      +0.2, +0.3,     1.0, 0.0, 0.0,
      +0.35, +0.3,    1.0, 0.0, 0.0,
    ];
    var line2 = [
      +0.35, +0.3,    1.0, 0.0, 0.0,
      +0.25, 0.0,      1.0, 0.0, 0.0,
      +0.55, 0.0,     1.0, 0.0, 0.0,
      +0.65, -0.1,    1.0, 0.0, 0.0,
      +0.455, -0.1,   1.0, 0.0, 0.0,
    ];
    var line3 = [
      +0.6, +0.3,     1.0, 0.0, 0.0,
      +0.45, +0.3,    1.0, 0.0, 0.0,
      +0.35, +0.035,  1.0, 0.0, 0.0,
      +0.5, +0.035,   1.0, 0.0, 0.0,
    ];
    var line4 = [
      +0.125, -0.3,   1.0, 0.0, 0.0,
      +0.2, -0.1,     1.0, 0.0, 0.0,
      +0.3, -0.1,     1.0, 0.0, 0.0,
      +0.2, -0.4,     1.0, 0.0, 0.0,
      +0.325, -0.5,   1.0, 0.0, 0.0,
      +0.46, -0.1,    1.0, 0.0, 0.0,
    ];

    var triangle1 = [
      // x, y,        r, g, b
      +0.2, +0.3,     1.0, 0.0, 0.0,
      0.0, -0.2,      1.0, 0.0, 0.0,
      +0.35, +0.3,    1.0, 0.0, 0.0,
      +0.125, -0.3,   1.0, 0.0, 0.0,
    ];
    var triangle2 = [
      // x, y,        r, g, b
      +0.1, 0.0,      1.0, 0.0, 0.0,
      +0.1, -0.1,     1.0, 0.0, 0.0,
      +0.55, 0.0,     1.0, 0.0, 0.0,
      +0.65, -0.1,    1.0, 0.0, 0.0,
    ];
    var triangle3 = [
      +0.6, +0.3,     1.0, 0.0, 0.0,
      +0.45, +0.3,    1.0, 0.0, 0.0,
      +0.5, +0.035,   1.0, 0.0, 0.0,
      +0.35, +0.035,  1.0, 0.0, 0.0,
    ];
    var triangle4 = [
      +0.3, -0.1,     1.0, 0.0, 0.0,
      +0.2 ,-0.4,     1.0, 0.0, 0.0,
      +0.46, -0.1,    1.0, 0.0, 0.0,
      +0.325, -0.5,   1.0, 0.0, 0.0,
    ];

    function drawShapes(type, vertices, n){
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');

      gl.vertexAttribPointer(
        vPosition, //variabel pemegang posisi atribut di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,   
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
        0
      );
      gl.vertexAttribPointer(
        vColor, 
        3, 
        gl.FLOAT, 
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }

    function render() {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      var thetaLoc = gl.getUniformLocation(program, 'theta');
      theta += 0.0082;
      gl.uniform1f(thetaLoc, theta);

      drawShapes(gl.LINE_STRIP, line1, 4);
      drawShapes(gl.LINE_STRIP, line2, 5);
      drawShapes(gl.LINE_LOOP, line3, 4);
      drawShapes(gl.LINE_STRIP, line4, 6);

      gl.useProgram(program2);
      var scaleLoc = gl.getUniformLocation(program2, 'scale');
      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1; 
      scale += 0.0082 * membesar;
      gl.uniform1f(scaleLoc, scale);

      drawShapes(gl.TRIANGLE_STRIP, triangle1, 4);
      drawShapes(gl.TRIANGLE_STRIP, triangle2, 4);
      drawShapes(gl.TRIANGLE_STRIP, triangle3, 4);
      drawShapes(gl.TRIANGLE_STRIP, triangle4, 4);
      requestAnimationFrame(render);
    }

    render();
  }

})();