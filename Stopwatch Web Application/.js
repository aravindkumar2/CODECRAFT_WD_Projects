let startTime, updatedTime, difference, tInterval, running = false;
let lapCount = 1;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00.0';
    laps.innerHTML = '';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapCount = 1;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 100);

    display.textContent = 
        `${(hours > 9 ? hours : '0' + hours)}:` +
        `${(minutes > 9 ? minutes : '0' + minutes)}:` +
        `${(seconds > 9 ? seconds : '0' + seconds)}.` +
        `${milliseconds}`;
}

function recordLap() {
    const lapTime = document.createElement('div');
    lapTime.classList.add('lap');
    lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
    laps.appendChild(lapTime);
    lapCount++;
}
