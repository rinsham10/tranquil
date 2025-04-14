// Mood-based recommendations with multiple options
const moodRecommendations = {
  Happy: [
    {
      quote: "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
      recommendation: "Share your happiness with others! Spread positivity today by complimenting someone or doing something kind."
    },
    {
      quote: "Happiness depends upon ourselves. - Aristotle",
      recommendation: "Take a moment to appreciate what you have right now, and enjoy the simple joys of life."
    },
    {
      quote: "The most important thing is to enjoy your life – to be happy – it’s all that matters. - Audrey Hepburn",
      recommendation: "Take a few minutes today to do something that brings you joy and helps you stay connected to your happiness."
    },
    {
      quote: "For every minute you are angry, you lose sixty seconds of happiness. - Ralph Waldo Emerson",
      recommendation: "If you're feeling extra happy, share that energy with others. A small act of kindness can go a long way!"
    },
    {
      quote: "Be happy for this moment. This moment is your life. - Omar Khayyam",
      recommendation: "Smile at a stranger today and feel the happiness ripple through both of you."
    }
  ],
  Sad: [
    {
      quote: "Tears are the words that the heart can't express. - Unknown",
      recommendation: "It's okay to feel sad sometimes. Try journaling your thoughts or taking a walk to clear your mind."
    },
    {
      quote: "The pain you feel today is the strength you feel tomorrow. - Unknown",
      recommendation: "Give yourself permission to feel what you’re feeling. Take a break, relax, and focus on self-care."
    },
    {
      quote: "It’s okay to not be okay. - Unknown",
      recommendation: "Consider talking to someone you trust, or even taking a mental health day to recover and recharge."
    },
    {
      quote: "Sadness flies away on the wings of time. - Jean de La Fontaine",
      recommendation: "Watch your favorite comfort show, or try doing something creative to release your emotions."
    },
    {
      quote: "In the middle of difficulty lies opportunity. - Albert Einstein",
      recommendation: "Focus on small, achievable tasks to help regain a sense of control and accomplishment."
    }
  ],
  Angry: [
    {
      quote: "Holding onto anger is like drinking poison and expecting the other person to die. - Buddha",
      recommendation: "Take a few deep breaths and try to let go of that anger. Consider doing a short meditation or a physical activity like stretching."
    },
    {
      quote: "Anger is a short madness. - Horace",
      recommendation: "Take a timeout from the situation. Go for a walk or meditate to help cool down."
    },
    {
      quote: "For every minute you are angry, you lose sixty seconds of happiness. - Ralph Waldo Emerson",
      recommendation: "Instead of focusing on the anger, try finding something that makes you laugh or relax."
    },
    {
      quote: "The best fighter is never angry. - Lao Tzu",
      recommendation: "Channel your anger into a productive activity, like working out or doing something that calms your mind."
    },
    {
      quote: "When anger rises, think of the consequences. - Confucius",
      recommendation: "Consider letting go of your anger by doing a quick, deep breathing exercise. Try to focus on something positive."
    }
  ],
  Calm: [
    {
      quote: "Calmness is the cradle of power. - Josiah Gilbert Holland",
      recommendation: "You're feeling centered today! Keep this energy going by practicing mindfulness or enjoying a peaceful activity like reading."
    },
    {
      quote: "Stillness is the key to creativity. - Unknown",
      recommendation: "You’re in a great place for self-reflection. Try journaling or meditating to keep that peaceful energy flowing."
    },
    {
      quote: "A calm mind brings inner strength and self-confidence. - Dalai Lama",
      recommendation: "Enjoy a quiet walk or sit in a peaceful spot with some calming music or nature sounds."
    },
    {
      quote: "Peace comes from within. Do not seek it without. - Buddha",
      recommendation: "Use your calm mood to help others. Your peaceful energy can be contagious and bring tranquility to those around you."
    },
    {
      quote: "Nothing is more calming than a gentle breeze. - Unknown",
      recommendation: "Enjoy some time in nature, even if it’s just a moment with a cup of tea and your favorite view."
    }
  ]
};

const moodButtons = document.querySelectorAll(".mood-btn");
const logContainer = document.getElementById("mood-log");

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

  // Display the mood-based quote and recommendation
  displayMoodRecommendation(mood);

  // Update calendar UI
  if (typeof renderMoodCalendar === "function") {
    renderMoodCalendar(); // this function should exist in your script
  }
}

// Display mood-based recommendation and quote
function displayMoodRecommendation(mood) {
  const recommendationContainer = document.getElementById("mood-recommendation");
  const moodInfoArray = moodRecommendations[mood];

  if (moodInfoArray && moodInfoArray.length > 0) {
    // Select a random quote and recommendation
    const randomIndex = Math.floor(Math.random() * moodInfoArray.length);
    const moodInfo = moodInfoArray[randomIndex];

    recommendationContainer.innerHTML = `
      <h3><strong>Quote for You:</strong></h3>
      <p>"${moodInfo.quote}"</p><br>
      <h3><strong>Recommendation:</strong></h3>
      <p>${moodInfo.recommendation}</p>
    `;
  } else {
    recommendationContainer.innerHTML = "<p>No recommendation available for this mood.</p>";
  }
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
