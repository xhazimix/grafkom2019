(function(global) {

  glUtils.SL.init({ callback: function() { main(); } });

  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);
  var shaders = [];
  
  var scale = 0;
  var adder = 0.0082;

  var xAdders = 0.04;
  var yAdders = 0.03;
  var zAdders = 0.02;
  var translate = [0.0, 0.0, 0.0];
  var rotAdder = 0.5;

  var theta = [0.0, 0.0, 0.0];
  var axis = 0;
  var xAxis = 0;
  var yAxis = 1;
  var zAxis = 2;

  function main() {
    //resize the canvas to fill browser window dynamically
    //window.addEventListener('resize', resizer);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    
    shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
    shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));

    var cubeVertices = [
      // x, y, z      r, g, b
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,

      0.5,  0.5,  0.5,   1.0, 1.0, 1.0, 
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,

      0.5, -0.5,  0.5,   1.0, 1.0, 1.0, 
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,

      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0, 
      -0.5, 0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,

      -0.5, 0.5,  -0.5,   1.0, 1.0, 1.0, 
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,

       0.5,  0.5, -0.5,  1.0, 1.0, 1.0, 
      -0.5, 0.5,  -0.5,  1.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,  1.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
       0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
       0.5,  0.5, -0.5,  1.0, 1.0, 1.0,
       0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
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

    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT);

      drawShapes(gl.TRIANGLE_STRIP, triangle1, 1, shaders[1]);
      drawShapes(gl.TRIANGLE_STRIP, triangle2, 1, shaders[1]);
      drawShapes(gl.TRIANGLE_STRIP, triangle3, 1, shaders[1]);
      drawShapes(gl.TRIANGLE_STRIP, triangle4, 1, shaders[1]);
      drawShapes(gl.LINES, cubeVertices, 0, shaders[0]);
      requestAnimationFrame(render);
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    render();

    function drawShapes(type, vertices, mode, program){
      var n = initBuffers(mode, vertices, program);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function initBuffers(mode, vertices, program){
      var n;
      if(mode){
        n = vertices.length;
      } else {
        n = vertices.length/6;
      }

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      // Definisi view dan projection
      var vmLoc = gl.getUniformLocation(program, 'view');
      var pmLoc = gl.getUniformLocation(program, 'projection');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, -0.5),    
        glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)  
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');

      function onKeyPress(event) {
        if (event.keyCode == 83 || event.keyCode == 115) {
          rotAdder = 0.0;
        } else if (event.keyCode == 67 || event.keyCode == 99) {
          rotAdder = 0.5;
        }
  
        if (event.keyCode == 88 || event.keyCode == 120) {
          axis = xAxis;
        } else if (event.keyCode == 89 || event.keyCode == 121) {
          axis = yAxis;
        } else if (event.keyCode == 90 || event.keyCode == 122) {
          axis = zAxis;
        }
      }
      document.addEventListener('keypress', onKeyPress);

      theta[axis] += rotAdder;

      if (mode) {
        var scaleLocation = gl.getUniformLocation(program, 'scale');
        gl.uniform1f(scaleLocation, scale);
        if (scale > 1){
          adder = -0.0082
        }
        else if (scale < -1){
          adder = 0.0082
        }

        scale += adder;
        
        gl.vertexAttribPointer(
            vPosition, 
            2, 
            gl.FLOAT,
            gl.FALSE, 
            5 * Float32Array.BYTES_PER_ELEMENT, 
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

        //Translasi X
        if (translate[0] + 0.5 > 0.5*5 || translate[0] + 0.2 < -0.5*5 ) {
          xAdders *= -1;
        }
        translate[0] += xAdders;

        var middleLoc = gl.getUniformLocation(program, 'middle_coordinates');
        middle_coordinates = 0.35 + translate[0];

        gl.uniform1f(middleLoc, middle_coordinates);
       

        //Translasi Y
        if (translate[1] + 0.5 > 0.5*5 || translate[1] + -0.5 < -0.5*5 ) {
          yAdders *= -1;
        }
        translate[1] += yAdders;

        //Translasi Z
        if (translate[2] > 0.5*0.5 || translate[2] < -0.5*0.5 ) {
          zAdders *= -1;
        }
        translate[2] += zAdders;

        var translationLoc = gl.getUniformLocation(program, 'translate');

        gl.uniform3fv(translationLoc, translate);

        var thetaLoc = gl.getUniformLocation(program, 'theta');

        gl.uniform3fv(thetaLoc, theta);
      } else{
          gl.vertexAttribPointer(
            vPosition,  
            3,          
            gl.FLOAT,   
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, 
            0                                  
          );
          
          gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
            6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

          var thetaLoc = gl.getUniformLocation(program, 'theta');

          gl.uniform3fv(thetaLoc, theta);

      }

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);
      return n;
    }
  }
})();