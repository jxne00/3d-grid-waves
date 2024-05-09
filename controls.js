function setupSliders() {
    // setup height slider
    heightSld = createSlider(-400, 400, 0, 10); // min: -400, max: 400
    heightSld.position(110, 750);
    heightSld.style('width', '90px');

    // setup wave slider
    waveSld = createSlider(-1, 15, 1, 0.5); // min: -1, max: 15
    waveSld.position(110, 695);
    waveSld.style('width', '90px');
}

function setupButtons() {
    // create "reset height" button
    resetHbtn = createButton('reset height');
    resetHbtn.position(115, 770);

    // reset height slider value when "reset height" button pressed
    resetHbtn.mousePressed(() => {
        heightSld.value(0);
    });

    // create "reset wave" button
    resetWbth = createButton('reset wave ');
    resetWbth.position(115, 715);

    // reset wave slider value when "reset wave" button pressed
    resetWbth.mousePressed(() => {
        waveSld.value(1);
    });

    // create "toggle spin" button
    spinBtn = createButton('Toggle spin direction');
    spinBtn.position(740, 765);

    // change 'camToLeft' boolean to the opposite value to indicate
    // direction change of camera rotation if "toggle spin" button is pressed
    spinBtn.mousePressed(() => {
        if (camToLeft) camToLeft = false;
        else camToLeft = true;
    });
}

function setText() {
    // height slider text label
    var height = createDiv('HEIGHT ');
    height.style('color', '#ffffff');
    height.position(40, 750);

    // wave slider text label
    var wave = createDiv('WAVE SPEED ');
    wave.style('color', '#ffffff');
    wave.position(3, 695);
}

function setupCheckboxes() {
    // create checkbox to toggle between normal/specular material
    materialBox = createCheckbox(' NORMAL MATERIAL', false);
    materialBox.position(728, 730);
    materialBox.style('font-size', '15px');
    materialBox.style('color', '#ffffff');

    confettiBox = createCheckbox(' HIDE CONFETTI', false);
    confettiBox.position(728, 705);
    confettiBox.style('font-size', '15px');
    confettiBox.style('color', '#ffffff');

    // redraw when checkbox is toggled
    materialBox.changed(loop);
    confettiBox.changed(loop);
}
