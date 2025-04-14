const moodButtons = document.querySelectorAll(".mood-btn");
const logContainer = document.getElementById("mood-log");

// Save mood for logs and calendar
function saveMood(mood) {
  const now = new Date();
  const timestamp = now.toLocaleString();
  const entry = `${timestamp} - Mood: ${mood}`;

  // Save for mood logs (text display)
  const logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
  logs.unshift(entry); // Add new entry at the top
  localStorage.setItem("moodLogs", JSON.stringify(logs));
  renderMoodLogs();

  // Save for mood calendar (data for calendar)
  const moodData = JSON.parse(localStorage.getItem("moodLog") || "[]");
  moodData.push({ mood, date: now });
  localStorage.setItem("moodLog", JSON.stringify(moodData));

  // Update calendar UI
  renderMoodCalendar();
}

// Render mood logs below the tracker
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

// Render the mood calendar (display days and moods)
function renderMoodCalendar() {
  const calendar = document.getElementById("mood-calendar");
  calendar.innerHTML = "";

  const moodData = JSON.parse(localStorage.getItem("moodLog") || "[]");

  // Create a map of moods per day
  const moodCountPerDay = {};
  moodData.forEach(entry => {
    const date = new Date(entry.date).toISOString().split("T")[0]; // YYYY-MM-DD
    if (!moodCountPerDay[date]) {
      moodCountPerDay[date] = [];
    }
    moodCountPerDay[date].push(entry.mood); // Save mood entries for each day
  });

  // Get current year and month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based (April = 3)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Render each day from 1 to end of month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = date.toISOString().split("T")[0]; // Get date string like '2025-04-06'
    const moodStats = moodCountPerDay[key] || [];
    
    // Find the most frequent mood for the day (most clicked mood)
    const moodFrequency = {};
    moodStats.forEach(mood => {
      moodFrequency[mood] = (moodFrequency[mood] || 0) + 1;
    });

    const topMood = Object.keys(moodFrequency).reduce((a, b) => moodFrequency[a] > moodFrequency[b] ? a : b, null);
    
    // Get the corresponding color for the most frequent mood
    const moodColors = {
      Happy: "#fcd34d", 
      Sad: "#93c5fd", 
      Angry: "#f87171", 
      Calm: "#6ee7b7"
    };

    const color = moodColors[topMood] || "#e5e7eb"; // Default gray if no mood

    const box = document.createElement("div");
    box.className = "mood-box p-4 rounded text-xs shadow text-center";
    box.style.backgroundColor = color;
    box.innerText = day;

    // Add click event to show log for that day
    box.addEventListener('click', () => {
      const dayMoods = moodCountPerDay[key] || [];
      const moodMessage = dayMoods.length > 0 ? `Mood log for ${key}: ${dayMoods.join(', ')}` : `No entries for ${key}`;
      alert(moodMessage); // You can replace this with a modal or a different UI element
    });

    calendar.appendChild(box);
  }
}

// Event listeners for mood buttons
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    console.log("Clicked mood:", mood);
    saveMood(mood); // Save the selected mood
  });
});

// Clear history
document.getElementById("clear-history").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your mood history?")) {
    localStorage.removeItem("moodLogs");
    localStorage.removeItem("moodLog"); // clear mood calendar data too
    renderMoodLogs();
    renderMoodCalendar(); // Clear the calendar as well
  }
});

// Initial load
renderMoodLogs();
renderMoodCalendar(); // Render calendar on initial load
