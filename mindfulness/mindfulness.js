const playMeditationBtn = document.getElementById('playMeditationBtn');
const stopMeditationBtn = document.getElementById('stopMeditationBtn');
let audio = new Audio('assets/relax.mp3');

// Play Meditation
playMeditationBtn.addEventListener('click', function () {
  audio.play();
  playMeditationBtn.classList.add('hidden');
  stopMeditationBtn.classList.remove('hidden');
  alert('Enjoy your meditation!');
});

// Stop Meditation
stopMeditationBtn.addEventListener('click', function () {
  audio.pause();
  audio.currentTime = 0;
  stopMeditationBtn.classList.add('hidden');
  playMeditationBtn.classList.remove('hidden');
});

// Guided Breathing
document.getElementById('startBreathingBtn').addEventListener('click', function () {
  alert('Starting guided breathing exercise...');
});

// Visuals
document.getElementById('viewVisualsBtn').addEventListener('click', function () {
  alert('Displaying relaxing visuals...');
  document.body.style.backgroundImage = "url('your-image-path.jpg')";
  document.body.style.backgroundSize = "cover";
});
