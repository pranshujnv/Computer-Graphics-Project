//NEED TO USE GLOBALS
var truncatedConeBuffer, 
    
    planeBuffer,
   
   
    sphereBuffer,
   
    cubeBuffer,
    cylinderBuffer,
   
    pyramidBuffer,
   
    coneBuffer;


function initPrimitives() {
  truncatedConeBuffer = p.createTruncatedConeBufferInfo(gl,1,0.5,1,10,10);
  coneBuffer = p.createTruncatedConeBufferInfo(gl,1,0,1,10,10);
  planeBuffer = p.createPlaneBufferInfo(gl);
 
  sphereBuffer = p.createSphereBufferInfo(gl,1,10,10);
  cubeBuffer = p.createCubeBufferInfo(gl);

  cylinderBuffer = p.createCylinderBufferInfo(gl,1,1,10,10);



    var pyramidVertexPos = [
    //top
      0.0, 0.5, 0.0,    //0
    //bottom square
      -0.5, -0.5, 0.5,  //1
      -0.5, -0.5, -0.5, //2
      0.5, -0.5, 0.5,   //3
      0.5, -0.5, -0.5   //4
   ];
  var pyramidTriangleIndices = [
    1,2,3, 2,4,3, 1,3,0, 3,4,0, 4,2,0, 1,0,2
  ];
    var pyramidVertexNormals = [
      0.0, 1.0, 0.0,   //0
      -1.0, 0.0, 1.0, //1
      -1.0, 0.0, -1.0,//2
      1.0, 0.0, 1.0,  //3
      1.0, 0.0, -1.0  //4
    ];
  var pyramidTexCoords = [
    0.5, 0.5,
    0.0, 0.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
  ]
  arrays = {position:pyramidVertexPos,
                 indices:pyramidTriangleIndices,
                     inColor:inColor,
                       normal:pyramidVertexNormals,
                         texcoord: pyramidTexCoords,
           };
   pyramidBuffer = twgl.createBufferInfoFromArrays(gl, arrays);
}
