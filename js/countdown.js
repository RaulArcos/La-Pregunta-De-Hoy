// Function to calculate time remaining until 5 AM
function timeUntil5AM() {
    const now = new Date();
    const resetTime = new Date();
    
    resetTime.setHours(5, 0, 0, 0);

    // If the current time is after 5 AM, set the reset time to 5 AM tomorrow
    if (now > resetTime) {
        resetTime.setDate(resetTime.getDate() + 1);
    }

    const timeRemaining = resetTime - now;
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
}

// Function to update the countdown timer
function updateTimer() {
    const time = timeUntil5AM();
    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');
    const seconds = String(time.seconds).padStart(2, '0');

    // Display the time in HH:MM:SS format
    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the timer initially
updateTimer();

// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000)