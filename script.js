// Get DOM elements
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

const darkModeToggle = document.getElementById('darkModeToggle');
const likeButton = document.getElementById('likeButton');
const modeText = document.getElementById('modeText'); // Get the text element for mode

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

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
    lapList.innerHTML = '';
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

// Like Button functionality (with custom alert)
likeButton.addEventListener('click', () => {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('custom-alert');

    const heading = document.createElement('h3');
    heading.textContent = 'This page says';

    const message = document.createElement('p');
    message.innerHTML = 'Thank you for liking the stopwatch! ❤️';

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 300);
    });

    alertDiv.appendChild(heading);
    alertDiv.appendChild(message);
    alertDiv.appendChild(okButton);
    document.body.appendChild(alertDiv);

    setTimeout(() => alertDiv.classList.add('show'), 10);
});

// Initialize time display and mode text on load
timeDisplay.textContent = "00:00:00.000";

// --- IMPORTANT FIX: Set initial mode text based on the toggle's initial state ---
// Check if the toggle is initially checked (e.g., if set via browser's persistence or HTML attribute)
if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    modeText.textContent = "Dark"; // If it starts checked, show "Dark"
} else {
    document.body.classList.remove('dark-mode');
    modeText.textContent = "Light"; // If it starts unchecked, show "Light"
}
// -------------------------------------------------------------------------------