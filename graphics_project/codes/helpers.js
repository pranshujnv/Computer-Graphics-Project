function pushMatrix() {
    matrixStack.push(m4.copy(Tmodel));
}

function popMatrix() {
    Tmodel = matrixStack.pop(Tmodel);
}

function scale(scale) {
    mat4.scale(Tmodel, Tmodel, scale);
}

function translate(translate) {
    mat4.translate(Tmodel, Tmodel, translate);
}

function rotate(rotate, axis) {
    mat4.rotate(Tmodel, Tmodel, rotate, axis);
}

function rotateFromPiv(piv, rotate, axis, z) {
    mat4.rotate(Tmodel, Tmodel, rotate, axis);
    var temp = mat4.create();
    mat4.translate(temp, temp, piv);
    mat4.multiply(Tmodel, Tmodel, temp);
}

function rad(degrees) {
    return (degrees) / 180 * Math.PI;
}


function initTex(texName) {
    // Set up texture
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var image = new Image();

    image.onload = LoadTexture;
    image.crossOrigin = "anonymous";
    image = origTex(texName, image);

    function LoadTexture() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    }
    return texture;
}



var Hermite = function (t) {
    return [
        2 * t * t * t - 3 * t * t + 1,
        t * t * t - 2 * t * t + t,
        -2 * t * t * t + 3 * t * t,
        t * t * t - t * t
      ];
}

var HermiteDerivative = function (t) {
    return [
        6 * t * t - 6 * t,
        3 * t * t - 4 * t + 1,
        -6 * t * t + 6 * t,
        3 * t * t - 2 * t
      ];
}

// This can generate both the function C(t) and the derivative C'(t),
// depending on the basis passed in
function Cubic(basis, P, t) {
    var b = basis(t);
    var result = v3.mulScalar(P[0], b[0]);
    v3.add(v3.mulScalar(P[1], b[1]), result, result);
    v3.add(v3.mulScalar(P[2], b[2]), result, result);
    v3.add(v3.mulScalar(P[3], b[3]), result, result);
    return result;
}

function pushMatrix() {
    matrixStack.push(m4.copy(Tmodel));
}

function popMatrix() {
    Tmodel = matrixStack.pop(Tmodel);
}

function defaultTex() {
    texture = checkersTex;
   // inColor = [1.0, 0.6, 0.0];
}

function scale(scale) {
    mat4.scale(Tmodel, Tmodel, scale);
}

function translate(translate) {
    mat4.translate(Tmodel, Tmodel, translate);
}

function rotate(rotate, axis) {
    mat4.rotate(Tmodel, Tmodel, rotate, axis);
}

function rotateFromPiv(piv, rotate, axis, z) {
    mat4.rotate(Tmodel, Tmodel, rotate, axis);
    var temp = mat4.create();
    mat4.translate(temp, temp, piv);
    mat4.multiply(Tmodel, Tmodel, temp);
}

function rad(degrees) {
    return (degrees) / 180 * Math.PI;
}


function events() {

var lastDownTarget;
document.addEventListener('mousedown', function (e) {
    lastDownTarget = event.target;
}, false);



reset.addEventListener('click', function (event) {
    console.log("Reset");
    slider2.value = 1;
    sliderX.value = 0;
    sliderY.value = 0;
    sliderZ.value = 0;
    sliderScaleX.value = 5;
    sliderScaleY.value = 5;
    sliderScaleZ.value = 5;
    rotator.setViewDistance(10);
    forward = 0;
    turn = 0;
    y = 0;
    lift = 0;
});

togglePlay.addEventListener('click', function (event) {
    console.log("Play");
    if (play)
        play = false;
    else
        play = true;
});
}

/** This is high-level function.
 * It must react to delta being more/less than zero.
 */
function handle(delta) {
    if (delta < 0)
        rotator.setViewDistance(rotator.getViewDistance() + 0.5);
    else
        rotator.setViewDistance(rotator.getViewDistance() - 0.5);
}

/** Event handler for mouse wheel event.
 */
function wheel(event) {
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
    } else if (event.detail) { /** Mozilla case. */
        /** In Mozilla, sign of delta is different than in IE.
         * Also, delta is multiple of 3.
         */
        delta = -event.detail / 3;
    }
    /** If delta is nonzero, handle it.
     * Basically, delta is now positive if wheel was scrolled up,
     * and negative, if wheel was scrolled down.
     */
    if (delta)
        handle(delta);
    /** Prevent default actions caused by mouse wheel.
     * That might be ugly, but we handle scrolls somehow
     * anyway, so don't bother here..
     */
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}