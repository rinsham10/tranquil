// Breathing Section
const breathingSection = document.getElementById('breathingSection');
const breathingTimer = document.getElementById('breathingTimer');
const breathingInstruction = document.getElementById('breathingInstruction');
const startBreathingBtn = document.getElementById('startBreathingBtn');
const startBreathingBtnTimer = document.getElementById('startBreathingBtnTimer');
const pauseBreathingBtn = document.getElementById('pauseBreathingBtn');
const stopBreathingBtn = document.getElementById('stopBreathingBtn');
const resumeBreathingBtn = document.getElementById('resumeBreathingBtn');
const endBreathingBtn = document.getElementById('endBreathingBtn');

// Audio Meditation Section
const playMeditationBtn = document.getElementById('playMeditationBtn');
const stopMeditationBtn = document.getElementById('stopMeditationBtn');
const relaxingAudio = document.getElementById('relaxingAudio');
const musicPlayerSection = document.getElementById('musicPlayerSection');
const stopMusicBtn = document.getElementById('stopMusicBtn');
const closeMusicSectionBtn = document.getElementById('closeMusicSectionBtn');

// Visuals
const viewVisualsBtn = document.getElementById('viewVisualsBtn');

// Show music player and play music
playMeditationBtn.addEventListener('click', () => {
  musicPlayerSection.style.display = 'block';
  relaxingAudio.play();
  playMeditationBtn.classList.add('hidden');
  stopMeditationBtn.classList.remove('hidden');
});

// Stop meditation (hide play/stop)
stopMeditationBtn.addEventListener('click', () => {
  relaxingAudio.pause();
  relaxingAudio.currentTime = 0;
  playMeditationBtn.classList.remove('hidden');
  stopMeditationBtn.classList.add('hidden');
});

// Stop music inside player
stopMusicBtn.addEventListener('click', () => {
  relaxingAudio.pause();
  relaxingAudio.currentTime = 0;
});

// Close music section
closeMusicSectionBtn.addEventListener('click', () => {
  relaxingAudio.pause();
  relaxingAudio.currentTime = 0;
  musicPlayerSection.style.display = 'none';
  playMeditationBtn.classList.remove('hidden');
  stopMeditationBtn.classList.add('hidden');
});

// Show visuals
viewVisualsBtn.addEventListener('click', () => {
  alert("Visuals will be displayed here!");
});

// Breathing Logic
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

startBreathingBtn.addEventListener('click', () => {
  breathingSection.style.display = "block";
  startBreathingBtn.style.display = "none";
  startBreathingBtnTimer.style.display = "inline-block";
});

startBreathingBtnTimer.addEventListener('click', () => startBreathingExercise());

function startBreathingExercise() {
  timeLeft = breathingSteps[currentStep].duration;
  breathingInstruction.textContent = breathingSteps[currentStep].description;
  breathingTimer.textContent = timeLeft;

  breathingInterval = setInterval(() => {
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

  startBreathingBtnTimer.style.display = "none";
  pauseBreathingBtn.style.display = "inline-block";
  stopBreathingBtn.style.display = "inline-block";
  resumeBreathingBtn.style.display = "none";
  endBreathingBtn.style.display = "none";

  isBreathing = true;
  isPaused = false;
}

pauseBreathingBtn.addEventListener('click', () => {
  clearInterval(breathingInterval);
  pauseBreathingBtn.style.display = "none";
  resumeBreathingBtn.style.display = "inline-block";
  isPaused = true;
  isBreathing = false;
});

resumeBreathingBtn.addEventListener('click', () => {
  breathingInterval = setInterval(() => {
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

stopBreathingBtn.addEventListener('click', () => {
  clearInterval(breathingInterval);
  breathingTimer.textContent = "--";
  breathingInstruction.textContent = "Click 'Start' to begin again.";
  pauseBreathingBtn.style.display = "none";
  resumeBreathingBtn.style.display = "none";
  stopBreathingBtn.style.display = "none";
  startBreathingBtnTimer.style.display = "inline-block";
  endBreathingBtn.style.display = "inline-block";
  isBreathing = false;
  isPaused = false;
  currentStep = 0;
});

endBreathingBtn.addEventListener('click', () => {
  breathingSection.style.display = "none";
  startBreathingBtn.style.display = "inline-block";
  endBreathingBtn.style.display = "none";
  breathingTimer.textContent = "--";
  breathingInstruction.textContent = "Click 'Start Breathing Exercise' to begin.";
  currentStep = 0;
  isBreathing = false;
  isPaused = false;
});

// 🎵 Audio Recommendation Section (External Links)
const playlistBtn = document.getElementById('playlistBtn');
const peacefulMusicBtn = document.getElementById('peacefulMusicBtn');
const sleepMusicBtn = document.getElementById('sleepMusicBtn');


// Links to external playlists (replace with your own or real ones)
const playlistLinks = {
  calming: "https://open.spotify.com/playlist/3l6b0zuXjgyPxLK6PIAqED?si=7pMUJOVlQ5yzwWAmod59gw",  // Replace with your fav calming playlist
  peaceful: "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u", // Peaceful piano
  sleep: "https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp"     // Deep sleep
};

// Update display text and open the link
function openMusicRecommendation(url, label) {
  window.open(url, '_blank');
}

// Event Listeners for each button
playlistBtn.addEventListener('click', () => {
  openMusicRecommendation(playlistLinks.calming, "Calming Playlist on Spotify");
});

peacefulMusicBtn.addEventListener('click', () => {
  openMusicRecommendation(playlistLinks.peaceful, "Peaceful Piano Playlist");
});

sleepMusicBtn.addEventListener('click', () => {
  openMusicRecommendation(playlistLinks.sleep, "Sleep Sounds Playlist");
});
