// Select DOM elements
const journalEntry = document.getElementById('journal-entry');
const saveButton = document.getElementById('save-entry');
const entriesList = document.getElementById('entries-list');

let editIndex = null; // Track if user is editing

// Load saved journal entries
function loadEntries() {
  const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entriesList.innerHTML = ''; // Clear the current entries before adding new ones

  savedEntries.forEach((entry, index) => {
    const text = typeof entry === 'string' ? entry : entry.text;
    const timestamp = typeof entry === 'string' ? 'Saved before timestamp update' : entry.timestamp;

    // Create the list item for each journal entry
    const entryItem = document.createElement('li');
    entryItem.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'p-4', 'mb-4');
    entryItem.innerHTML = `
      <p class="entry-text">${text}</p>
      <span class="timestamp text-gray-500 text-sm block mt-2">${timestamp}</span>
      <div class="entry-actions flex justify-end mt-4 space-x-2">
        <button class="edit-btn bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400" onclick="editEntry(${index})">Edit</button>
        <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400" onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
    entriesList.appendChild(entryItem);
  });
}

// Save or update entry
function saveEntry() {
  const newEntryText = journalEntry.value.trim();
  const now = new Date();
  const formattedTime = now.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  if (newEntryText) {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    if (editIndex !== null) {
      // Update existing entry
      savedEntries[editIndex] = {
        text: newEntryText,
        timestamp: formattedTime
      };
      editIndex = null;
      saveButton.textContent = "Save Entry";
    } else {
      // Add new entry
      const newEntry = {
        text: newEntryText,
        timestamp: formattedTime
      };
      savedEntries.push(newEntry);
    }

    localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
    journalEntry.value = '';
    loadEntries();
  } else {
    alert('Please write something before saving!');
  }
}

// Delete an entry
function deleteEntry(index) {
  const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  savedEntries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
  loadEntries();
}

// Edit an entry
function editEntry(index) {
  const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  journalEntry.value = savedEntries[index].text;
  editIndex = index;
  saveButton.textContent = "Update Entry";
}

// Event listener for the save button
saveButton.addEventListener('click', saveEntry);

// Load entries when the page loads
window.onload = loadEntries;
