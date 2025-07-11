// Get DOM elements
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

// Adjusted to refer to new header toggle elements
const darkModeToggle = document.getElementById('darkModeToggle');
const modeText = document.getElementById('modeText'); // This element is now in the header

// REMOVED: timeTravelerButton and timeTravelerList elements

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;
// REMOVED: timeTravelerSnapshots array

// Function to format time for display
function formatTime(ms) {
    const totalMilliseconds = ms;
    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000));

    const pad = (num) => String(num).padStart(2, '0');
    const padMs = (num) => String(num).padStart(3, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
}

// Update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start button functionality
startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    }
});

// Pause button functionality
pauseButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = 0;
    lapCounter = 0;
    timeDisplay.textContent = "00:00:00.000";
    lapList.innerHTML = ''; // Clear lap times
});

// Lap button functionality
lapButton.addEventListener('click', () => {
    if (isRunning) {
        lapCounter++;
        const lapTime = formatTime(elapsedTime);
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapList.appendChild(listItem); // Add new lap to the bottom of the list for ascending order
    }
});

// Dark Mode Toggle functionality
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        modeText.textContent = "Dark"; // Change text to "Dark"
    } else {
        document.body.classList.remove('dark-mode');
        modeText.textContent = "Light"; // Change text to "Light"
    }
});

// REMOVED: Function to render time traveler snapshots (renderTimeTravelerSnapshots)
// REMOVED: Function to restore a saved snapshot (restoreSnapshot)
// REMOVED: Time Traveler button functionality (event listener for timeTravelerButton)

// Initialize time display and mode text on load
timeDisplay.textContent = "00:00:00.000";

// Set initial mode text based on the toggle's initial state
// This now correctly targets the header toggle elements
if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    modeText.textContent = "Dark";
} else {
    document.body.classList.remove('dark-mode');
    modeText.textContent = "Light";
}

// REMOVED: Function to load time traveler snapshots from localStorage on page load (loadTimeTravelerSnapshots)
// REMOVED: Call to loadTimeTravelerSnapshots()
