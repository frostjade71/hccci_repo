let alarmTime = null;
let alarmSet = false;
let alarmPlaying = false;
const alarmSound = document.getElementById("alarm-sound");
const stopButton = document.getElementById("stop-btn");

// Function to update the real-time clock
function updateClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    document.getElementById("current-time").innerText = `${hours}:${minutes}:${seconds}`;

    // Check if it's alarm time
    if (alarmSet && `${hours}:${minutes}` === alarmTime) {
        ringAlarm();
    }

    setTimeout(updateClock, 1000); // Update every second
}

// Function to set the alarm
function setAlarm() {
    alarmTime = document.getElementById("alarm-time").value;
    if (alarmTime) {
        alarmSet = true;
        document.getElementById("alarm-status").innerText = `✅ Alarm set for ${alarmTime}`;
    } else {
        alert("⛔ Please select a valid time!");
    }
}

// Function to play the alarm
function ringAlarm() {
    if (!alarmPlaying) {
        alarmSet = false;
        alarmPlaying = true;
        document.getElementById("alarm-status").innerText = "⏰ Time to wake up!";
        stopButton.style.display = "inline"; // Show the stop button
        
        // Play alarm sound 5 times
        let beepCount = 0;
        let alarmInterval = setInterval(() => {
            if (beepCount < 5) {
                alarmSound.play();
                beepCount++;
            } else {
                clearInterval(alarmInterval);
            }
        }, 2000); // Plays sound every 2 seconds
    }
}

// Function to stop the alarm
function stopAlarm() {
    alarmPlaying = false;
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset audio
    document.getElementById("alarm-status").innerText = "🔕 Alarm stopped";
    stopButton.style.display = "none"; // Hide stop button
}

// Start the clock
updateClock();
