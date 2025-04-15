// Select DOM elements
const journalEntry = document.getElementById('journal-entry');
const saveButton = document.getElementById('save-entry');
const entriesList = document.getElementById('entries-list');

// Function to load saved journal entries from local storage
function loadEntries() {
  const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

  entriesList.innerHTML = '';

  savedEntries.forEach((entry, index) => {
    // Support both old string format and new object format
    const text = typeof entry === 'string' ? entry : entry.text;
    const timestamp = typeof entry === 'string' ? 'Saved before timestamp update' : entry.timestamp;

    const entryItem = document.createElement('li');
    entryItem.innerHTML = `
      <div class="entry-content">
        <p class="entry-text">${text}</p>
        <span class="timestamp">${timestamp}</span>
        <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
    entriesList.appendChild(entryItem);
  });
}

// Function to save a new journal entry
function saveEntry() {
  const newEntryText = journalEntry.value.trim();

  if (newEntryText) {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    const now = new Date();
    const formattedTime = now.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const newEntry = {
      text: newEntryText,
      timestamp: formattedTime
    };

    savedEntries.push(newEntry);
    localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

    journalEntry.value = '';
    loadEntries();
  } else {
    alert('Please write something before saving!');
  }
}

// Function to delete an entry
function deleteEntry(index) {
  const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  savedEntries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
  loadEntries();
}

// Event listener for the save button
saveButton.addEventListener('click', saveEntry);

// Load saved entries when the page loads
window.onload = loadEntries;
