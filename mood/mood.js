document.addEventListener("DOMContentLoaded", function () {
  const moodButtons = document.querySelectorAll(".mood-btn");
  const logContainer = document.getElementById("mood-log");
  const calendar = document.getElementById("mood-calendar");

  // Save mood for logs and calendar
  function saveMood(mood) {
    const now = new Date();
    const timestamp = now.toLocaleString();
    const entry = `${timestamp} - Mood: ${mood}`;

    // Save for mood logs (text display)
    const logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
    logs.unshift(entry);
    localStorage.setItem("moodLogs", JSON.stringify(logs));
    renderMoodLogs();

    // Save for mood calendar (data for calendar)
    const moodData = JSON.parse(localStorage.getItem("moodLog") || "[]");
    moodData.push({ mood, date: now });
    localStorage.setItem("moodLog", JSON.stringify(moodData));

    // Update the calendar UI
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

  // Render the mood calendar for the last 30 days
  function renderMoodCalendar() {
    if (!calendar) return;

    calendar.innerHTML = "";

    const moodData = JSON.parse(localStorage.getItem("moodLog") || "[]");

    // Create a map of moods per day
    const moodCountPerDay = {};
    moodData.forEach(entry => {
      const date = new Date(entry.date).toISOString().split("T")[0]; // YYYY-MM-DD
      if (!moodCountPerDay[date]) {
        moodCountPerDay[date] = {};
      }
      moodCountPerDay[date][entry.mood] = (moodCountPerDay[date][entry.mood] || 0) + 1;
    });

    // Get current year and month
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-based (April = 3)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Render each day from 1 to end of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const key = date.toISOString().split("T")[0];
      const moodStats = moodCountPerDay[key] || {};
      const topMood = Object.keys(moodStats).reduce((a, b) => moodStats[a] > moodStats[b] ? a : b, null);

      const moodColors = {
        Happy: "#fcd34d",  // yellow
        Sad: "#93c5fd",    // blue
        Angry: "#f87171",  // red
        Calm: "#6ee7b7"    // green
      };

      const color = moodColors[topMood] || "#e5e7eb"; // default gray

      const box = document.createElement("div");
      box.className = "p-4 rounded text-xs shadow text-center";
      box.style.backgroundColor = color;
      box.innerText = day;
      box.title = topMood ? `Mood: ${topMood}` : "No entry";
      calendar.appendChild(box);
    }
  }

  // Event listeners for mood buttons
  moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood;
      console.log("Clicked mood:", mood);
      saveMood(mood);
    });
  });

  // Clear history
  document.getElementById("clear-history").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your mood history?")) {
      localStorage.removeItem("moodLogs");
      localStorage.removeItem("moodLog"); // clear mood calendar data too
      renderMoodLogs();
      renderMoodCalendar(); // clear calendar too
    }
  });

  // Initial load (for first page load or page refresh)
  renderMoodLogs();
  renderMoodCalendar(); // Ensures the calendar is rendered on load
});
