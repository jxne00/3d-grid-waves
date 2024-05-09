confLocs = [];
confTheta = [];

var heightSld;
var resetHbtn;
var waveSld;
var resetWbth;
var spinBtn;
var camToLeft = true;
var materialBox;
var confettiBox;

function setup() {
    createCanvas(900, 800, WEBGL);

    // setup sliders, buttons and checkboxes
    setupSliders();
    setupButtons();
    setupCheckboxes();

    // draw text to 'label' each slider
    setText();

    while (confLocs.length < 200) {
        // push 200 3D vectors into confLocs
        confLocs.push(
            new createVector(
                random(-500, 500), // x
                random(-800, 0), // y
                random(-500, 500) // z
            )
        );

        // push random angle from 0 to 360 into confTheta
        confTheta.push(random(0, 360));
    }
}

function draw() {
    background(125);
    angleMode(DEGREES);

    drawGrid();

    // draw confetti only if 'confettiBox' checkbox is unchecked
    if (!confettiBox.checked()) {
        push();
        // set normal material for confettis
        normalMaterial();
        confetti();
        pop();
    }
}

function drawGrid() {
    if (materialBox.checked()) {
        normalMaterial(); // set normal material
    } else {
        background(60, 80, 100); // change background color
        // set a material affected by lights
        specularMaterial(220, 80, 255);
        ambientLight(150);
        pointLight(255, 255, 255, 0, 0, 50);
    }

    stroke(0);
    strokeWeight(2);

    // grid of boxes (size 50x50x50)
    for (var x_axis = -400; x_axis < 400; x_axis += 50) {
        for (var z_axis = -400; z_axis < 400; z_axis += 50) {
            push();
            // animate the wave using frameCount and wave slider val
            var wave = frameCount * waveSld.value();

            // distance from middle of coordinate system
            var distance = dist(x_axis, 0, z_axis, 0, 0, 0) + wave;
            // map sine of distance to a value from 100 to 300
            var length = map(sin(distance + frameCount), -1, 1, 100, 300);

            translate(x_axis, 0, z_axis);
            // adjust box height according to slider value
            box(50, length + heightSld.value(), 50);

            pop();
        }
    }

    // make camera fly around in a circle
    var cam_x = cos(frameCount / 2) * 1000;
    var cam_z = sin(frameCount / 2) * 1000;

    // set rotation direction according to 'camToLeft' value
    if (camToLeft)
        // spin left (+ve x-axis)
        camera(cam_x, -800, cam_z, 0, 0, 0, 0, 1, 0);
    // spin right (-ve x-axis)
    else camera(-cam_x, -800, cam_z, 0, 0, 0, 0, 1, 0);
}

function confetti() {
    for (var i = 0; i < confLocs.length; i++) {
        push();
        // translate to each confLocs location
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        // rotate by corresponding theta
        rotateX(confTheta[i]);
        // draw 15x15 plane
        plane(15, 15);
        pop();

        // animate each confetti
        confLocs[i].y += 1;
        confTheta[i] += 10;

        // reset confetti to the top when y-axis > 0
        if (confLocs[i].y > 0) confLocs[i].y = -800;
    }
}
