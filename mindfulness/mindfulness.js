// Elements
const breathingSection = document.getElementById('breathingSection');
const breathingTimer = document.getElementById('breathingTimer');
const breathingInstruction = document.getElementById('breathingInstruction');
const startBreathingBtn = document.getElementById('startBreathingBtn');
const startBreathingBtnTimer = document.getElementById('startBreathingBtnTimer');
const pauseBreathingBtn = document.getElementById('pauseBreathingBtn');
const stopBreathingBtn = document.getElementById('stopBreathingBtn');
const resumeBreathingBtn = document.getElementById('resumeBreathingBtn');
const endBreathingBtn = document.getElementById('endBreathingBtn');

const playMeditationBtn = document.getElementById('playMeditationBtn');
const stopMeditationBtn = document.getElementById('stopMeditationBtn');
const viewVisualsBtn = document.getElementById('viewVisualsBtn');

let audio = new Audio('assets/relax.mp3'); // Replace with your actual path

// Play the meditation audio
playMeditationBtn.addEventListener('click', function () {
  audio.play();
  playMeditationBtn.classList.add('hidden');
  stopMeditationBtn.classList.remove('hidden');
  alert('Enjoy your meditation!');
});

// Stop the meditation audio
stopMeditationBtn.addEventListener('click', function () {
  audio.pause();
  audio.currentTime = 0;
  stopMeditationBtn.classList.add('hidden');
  playMeditationBtn.classList.remove('hidden');
});

// Timer & Exercise Variables
let breathingInterval;
let isBreathing = false;
let isPaused = false;
let timeLeft = 0;
let currentStep = 0;

const breathingSteps = [
  { action: "Inhale", duration: 4, description: "Inhale deeply through your nose." },
  { action: "Hold", duration: 7, description: "Hold your breath." },
  { action: "Exhale", duration: 8, description: "Exhale slowly through your mouth." },
  { action: "Hold", duration: 7, description: "Hold your breath again." }
];

// Show breathing section and hide the feature card button
startBreathingBtn.addEventListener('click', function () {
  breathingSection.style.display = "block";
  startBreathingBtn.style.display = "none";
  startBreathingBtnTimer.style.display = "inline-block";
});

// Start button in the timer section
startBreathingBtnTimer.addEventListener('click', function () {
  startBreathingExercise();
});

// Start Exercise
function startBreathingExercise() {
  timeLeft = breathingSteps[currentStep].duration;
  breathingInstruction.textContent = breathingSteps[currentStep].description;
  breathingTimer.textContent = timeLeft;

  breathingInterval = setInterval(function () {
    timeLeft--;
    breathingTimer.textContent = timeLeft;

    if (timeLeft <= 0) {
      currentStep++;
      if (currentStep < breathingSteps.length) {
        timeLeft = breathingSteps[currentStep].duration;
        breathingInstruction.textContent = breathingSteps[currentStep].description;
      } else {
        clearInterval(breathingInterval);
        breathingInstruction.textContent = "Breathing exercise complete.";
        breathingTimer.textContent = "--";
        startBreathingBtnTimer.disabled = false;
        pauseBreathingBtn.style.display = "none";
        resumeBreathingBtn.style.display = "none";
        stopBreathingBtn.style.display = "inline-block";
        endBreathingBtn.style.display = "inline-block";
      }
    }
  }, 1000);

  // Toggle buttons
  startBreathingBtnTimer.style.display = "none";
  pauseBreathingBtn.style.display = "inline-block";
  stopBreathingBtn.style.display = "inline-block";
  resumeBreathingBtn.style.display = "none";
  endBreathingBtn.style.display = "none";

  isBreathing = true;
  isPaused = false;
}

// Pause
pauseBreathingBtn.addEventListener('click', function () {
  clearInterval(breathingInterval);
  pauseBreathingBtn.style.display = "none";
  resumeBreathingBtn.style.display = "inline-block";
  isPaused = true;
  isBreathing = false;
});

// Resume
resumeBreathingBtn.addEventListener('click', function () {
  breathingInterval = setInterval(function () {
    timeLeft--;
    breathingTimer.textContent = timeLeft;

    if (timeLeft <= 0) {
      currentStep++;
      if (currentStep < breathingSteps.length) {
        timeLeft = breathingSteps[currentStep].duration;
        breathingInstruction.textContent = breathingSteps[currentStep].description;
      } else {
        clearInterval(breathingInterval);
        breathingInstruction.textContent = "Breathing exercise complete.";
        breathingTimer.textContent = "--";
        pauseBreathingBtn.style.display = "none";
        resumeBreathingBtn.style.display = "none";
        stopBreathingBtn.style.display = "inline-block";
        endBreathingBtn.style.display = "inline-block";
      }
    }
  }, 1000);

  resumeBreathingBtn.style.display = "none";
  pauseBreathingBtn.style.display = "inline-block";
  isPaused = false;
  isBreathing = true;
});

// Stop
stopBreathingBtn.addEventListener('click', function () {
  clearInterval(breathingInterval);
  breathingTimer.textContent = "--";
  breathingInstruction.textContent = "Click 'Start' to begin again.";

  pauseBreathingBtn.style.display = "none";
  resumeBreathingBtn.style.display = "none";
  stopBreathingBtn.style.display = "none";

  // Show start and end buttons
  startBreathingBtnTimer.style.display = "inline-block";
  endBreathingBtn.style.display = "inline-block";

  isBreathing = false;
  isPaused = false;
  currentStep = 0;
});

// End
endBreathingBtn.addEventListener('click', function () {
  breathingSection.style.display = "none";
  startBreathingBtn.style.display = "inline-block"; // Show feature card button again
  endBreathingBtn.style.display = "none";

  // Reset everything
  breathingTimer.textContent = "--";
  breathingInstruction.textContent = "Click 'Start Breathing Exercise' to begin.";
  currentStep = 0;
  isBreathing = false;
  isPaused = false;
});

// Visuals
viewVisualsBtn.addEventListener('click', function () {
  alert("Visuals will be displayed here!");
});
