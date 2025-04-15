// Elements
const breathingSection = document.getElementById('breathingSection');
const breathingTimer = document.getElementById('breathingTimer');
const breathingInstruction = document.getElementById('breathingInstruction');
const startBreathingBtn = document.getElementById('startBreathingBtn');
const startBreathingBtnTimer = document.getElementById('startBreathingBtnTimer');
const pauseBreathingBtn = document.getElementById('pauseBreathingBtn');
const stopBreathingBtn = document.getElementById('stopBreathingBtn');
const resumeBreathingBtn = document.getElementById('resumeBreathingBtn');
const playMeditationBtn = document.getElementById('playMeditationBtn');
const stopMeditationBtn = document.getElementById('stopMeditationBtn');
let audio = new Audio('assets/relax.mp3');  // Replace with the actual path to your meditation audio file

// Play the audio when the "Play Meditation" button is clicked
playMeditationBtn.addEventListener('click', function () {
  audio.play();  // Play the meditation audio
  playMeditationBtn.classList.add('hidden');  // Hide the "Play" button
  stopMeditationBtn.classList.remove('hidden');  // Show the "Stop" button
  alert('Enjoy your meditation!');
});

// Stop the audio when the "Stop Meditation" button is clicked
stopMeditationBtn.addEventListener('click', function () {
  audio.pause();  // Pause the audio
  audio.currentTime = 0;  // Reset the audio to the beginning
  stopMeditationBtn.classList.add('hidden');  // Hide the "Stop" button
  playMeditationBtn.classList.remove('hidden');  // Show the "Play" button again
});

// Timer and Breathing Exercise Variables
let breathingInterval;
let isBreathing = false;
let timeLeft = 0;
let currentStep = 0;
let isPaused = false;

// Breathing Steps (Inhale, Hold, Exhale, Hold)
const breathingSteps = [
  { action: "Inhale", duration: 4, description: "Inhale deeply through your nose." },
  { action: "Hold", duration: 7, description: "Hold your breath." },
  { action: "Exhale", duration: 8, description: "Exhale slowly through your mouth." },
  { action: "Hold", duration: 7, description: "Hold your breath again." }
];

// Show the breathing exercise section when the button is clicked
startBreathingBtn.addEventListener('click', function() {
  breathingSection.style.display = "block";
  startBreathingBtn.style.display = "none";  // Hide the initial button
  startBreathingBtnTimer.style.display = "inline-block";  // Show the Start button in the timer section
});

// Start Breathing Exercise when the Start button in the timer section is clicked
startBreathingBtnTimer.addEventListener('click', function() {
  startBreathingExercise();
});

// Start Breathing Exercise
function startBreathingExercise() {
  // Initialize values for starting the timer
  timeLeft = breathingSteps[currentStep].duration;
  breathingInstruction.textContent = breathingSteps[currentStep].description;
  breathingTimer.textContent = timeLeft;
  
  // Set interval to update the timer
  breathingInterval = setInterval(function() {
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
      }
    }
  }, 1000);

  // Hide Start button and show Pause/Stop/Resume buttons
  startBreathingBtnTimer.style.display = "none";
  pauseBreathingBtn.style.display = "inline-block";
  stopBreathingBtn.style.display = "inline-block";
  resumeBreathingBtn.style.display = "none"; // Hide Resume button initially
  isBreathing = true;
  isPaused = false;
}

// Pause Breathing Exercise
pauseBreathingBtn.addEventListener('click', function() {
  clearInterval(breathingInterval);  // Stop the timer
  pauseBreathingBtn.style.display = "none";
  resumeBreathingBtn.style.display = "inline-block";  // Show the Resume button
  isPaused = true;
  isBreathing = false;
});

// Resume Breathing Exercise
resumeBreathingBtn.addEventListener('click', function() {
  // Continue the breathing exercise from the paused state
  breathingInterval = setInterval(function() {
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
      }
    }
  }, 1000);

  resumeBreathingBtn.style.display = "none"; // Hide Resume button once resumed
  pauseBreathingBtn.style.display = "inline-block";  // Show Pause button
  isPaused = false;
  isBreathing = true;
});

// Stop Breathing Exercise
stopBreathingBtn.addEventListener('click', function() {
  clearInterval(breathingInterval);
  breathingTimer.textContent = "--";
  breathingInstruction.textContent = "Click 'Start' to begin again.";
  pauseBreathingBtn.style.display = "none";
  resumeBreathingBtn.style.display = "none"; // Hide Resume button
  startBreathingBtnTimer.style.display = "inline-block";
  isBreathing = false;
  isPaused = false;
  currentStep = 0; // Reset the steps
});


// Meditation Controls
let meditationAudio = new Audio('your-audio-file.mp3'); // Replace with the actual path to your meditation audio file

playMeditationBtn.addEventListener('click', function() {
  meditationAudio.play();
  playMeditationBtn.style.display = 'none';
  stopMeditationBtn.style.display = 'inline-block';
});

stopMeditationBtn.addEventListener('click', function() {
  meditationAudio.pause();
  meditationAudio.currentTime = 0; // Reset the audio to the beginning
  playMeditationBtn.style.display = 'inline-block';
  stopMeditationBtn.style.display = 'none';
});

// Relaxation Visuals (Placeholder for your implementation)
viewVisualsBtn.addEventListener('click', function() {
  // Placeholder for launching visuals (can be a separate page or modal)
  alert("Visuals will be displayed here!");
});

