var context = new AudioContext(),
  gainNode = context.createGain(),
  mousedown = false,
  oscillator = null;

gainNode.connect(context.destination);

var calculateFrequency = function (mouseXPosition) {
  var minFreq = 20,
      maxFreq = 2000;

  var actualFreq = ((mouseXPosition / window.innerWidth) * maxFreq) + minFreq;

  return actualFreq;
};

var calculateGain = function (mouseYPosition) {
  var minGain = 0,
      maxGain = 1;

  var actualGain = 1 - ((mouseYPosition / window.innerHeight) * maxGain) + minGain;

  return actualGain;
};

var createOscillator = function (e) {
  var xPos = e.clientX,
      yPos = e.clientY;

    if (e.touches) {
        xPos = e.touches[0].clientX;
        yPos = e.touches[0].clientY;
    }

    mousedown = true;

    oscillator = context.createOscillator();
    oscillator.frequency.setTargetAtTime(calculateFrequency(xPos), context.currentTime, 0.001);
    gainNode.gain.setTargetAtTime(calculateGain(yPos), context.currentTime, 0.001);
    oscillator.connect(gainNode);
    oscillator.start(context.currentTime);
};

var stopOscillator = function () {
    mousedown = false;

    if (oscillator) {
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
    }
};

var changeFrequency = function (e) {
    var xPos = e.clientX,
        yPos = e.clientY;

    if (e.touches) {
        xPos = e.touches[0].clientX;
        yPos = e.touches[0].clientY;
    }

    if (mousedown && oscillator) {
         oscillator.frequency.setTargetAtTime(calculateFrequency(xPos), context.currentTime , 0.001);
         gainNode.gain.setTargetAtTime(calculateGain(yPos), context.currentTime, 0.001);
    }
};

document.body.addEventListener('mousedown', function (e) {
    createOscillator(e);
});

document.body.addEventListener('touchstart', function (e) {
    createOscillator(e);
});

document.body.addEventListener('mouseup', function () {
    stopOscillator();
});

document.body.addEventListener('touchend', function () {
    stopOscillator();
});

document.body.addEventListener('mousemove', function (e) {
    changeFrequency(e);
});

document.body.addEventListener('touchmove', function (e) {
    changeFrequency(e);
});

