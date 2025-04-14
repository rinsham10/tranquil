const moodButtons = document.querySelectorAll(".mood-btn");
const logContainer = document.getElementById("mood-log");

function saveMood(mood) {
  const timestamp = new Date().toLocaleString();
  const entry = `${timestamp} - Mood: ${mood}`;
  console.log("Saving mood:", entry);
  const logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
  logs.unshift(entry); // Add new entry to top
  localStorage.setItem("moodLogs", JSON.stringify(logs));
  renderMoodLogs();
}

function renderMoodLogs() {
  const logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
  if (logs.length === 0) {
    logContainer.innerHTML = "<p>No mood entries yet.</p>";
  } else {
    logContainer.innerHTML = `
      <ul class="list-disc pl-5 space-y-1">
        ${logs.map(log => `<li>${log}</li>`).join("")}
      </ul>
    `;
  }
}

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    console.log("Clicked mood:", mood);
    saveMood(mood);
  });
});

renderMoodLogs();
document.getElementById("clear-history").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your mood history?")) {
      localStorage.removeItem("moodLogs");
      renderMoodLogs();
    }
  });
  