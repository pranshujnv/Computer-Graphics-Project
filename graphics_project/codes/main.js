const canvas = document.getElementById("mycanvas");
var forward, turn, lift, x, y, z;
var counter, time, play;

var Tcamera, Tprojection, Tmcp, buffers, coord, matrixStack,
    Tmc, Tmodel, rotator, inColor, shaders, texture;


const gl = twgl.getWebGLContext(canvas);
const m4 = twgl.m4;
const v3 = twgl.v3;
const p = twgl.primitives;


/////////////////////////////
//
//    MAIN DRAW FUNCTION
//
////////////////////////////

function draw() {
  
        Tcamera = rotator.getViewMatrix();
    

    let translate = [0, 0, 0];
    let scale = [1, 1, 1];
    let xAngle = [0, 0, 0];
    let yAngle = [0, 0, 0];
    let zAngle = [0, 0, 0];
    inColor = [1.0, 1.0, 1.0];

    pushMatrix();
    
    mat4.scale(Tmodel, Tmodel, [0.05 * sliderScaleX.value, 0.05 * sliderScaleY.value, 0.05 * sliderScaleZ.value]);
    
    mat4.translate(Tmodel, Tmodel, [sliderX.value * 0.1, sliderY.value * 0.1, sliderZ.value * 0.1]);

    // For EXAMINE
    if (checkbox.checked)
        examine();


    //NOT EXAMINE
    else {
       
        skybox();

        //DRAW WORLD
        pushMatrix();
        world();
        popMatrix();
    }
    popMatrix();

    //update
    if (play)
        counter += 0.1 * slider2.value;
   

   //RESIZE
//    window.addEventListener('resize', ()=> {
//        width = window.innerWidth;
//        height = window.innerHeight;
////        canvas.style.height = height+'px';
//        canvas.width = width;
//        canvas.height = height;});
    window.requestAnimationFrame(draw);
}



window.onload = setup;