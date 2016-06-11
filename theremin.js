var context = new AudioContext(),
  mousedown = false,
  oscillator = null;
var gainNode = context.createGain();

var calculateFrequency = function (mouseXPosition) {
  var minFreq = 20;
  var maxFreq = 2000;

  var actualFreq = ((mouseXPosition / window.innerWidth) * maxFreq) + minFreq;

  return actualFreq;
};

var calculateGain = function (mouseYPosition) {
  var minGain = 0;
  var maxGain = 1;

  return 1 - ((mouseYPosition / window.innerHeight) * maxGain) + minGain;
};

document.body.addEventListener('mousedown', function(e){

  mousedown = true;
  // Mouse was pressed
  oscillator = context.createOscillator();

  oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.05);
  gainNode.gain.setTargetAtTime(calculateFrequency(e.clientY), context.currentTime, 0.05);

  // Connect the oscillator to the speaker
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  // Start the oscillator to make sound (in this precise moment)
  oscillator.start(context.currentTime);
});

document.body.addEventListener('mouseup', function(){
  mousedown = false;
  // Mouse was released
  oscillator.stop(context.currentTime);
  oscillator.disconnect();  
  
});

document.body.addEventListener('mousemove', function(e) {
  if (mousedown) {
    oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(calculateFrequency(e.clientY), context.currentTime, 0.05);
  }
});

