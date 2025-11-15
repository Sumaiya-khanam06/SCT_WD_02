let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const toggleTheme = document.getElementById("toggleTheme");
const quoteText = document.getElementById("quoteText");

// Sounds
const soundStart = document.getElementById("soundStart");
const soundPause = document.getElementById("soundPause");
const soundLap = document.getElementById("soundLap");
const soundReset = document.getElementById("soundReset");

// Quotes
const quotes = [
  "Stay focused, Sumaiya — your time matters.",
  "Every second is a step closer to greatness.",
  "Your consistency is your superpower.",
  "Small progress is still progress.",
  "You are stronger than your excuses.",
  "Believe in your rhythm, Sumaiya.",
  "Your time shines when you do."
];

function randomQuote() {
  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}
setInterval(randomQuote, 6000);
randomQuote();

// Format time
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// Update stopwatch
function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = formatTime(elapsedTime);
}

// START
startBtn.addEventListener("click", () => {
  if (!running) {
    soundStart.play();
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    running = true;

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
  }
});

// PAUSE
pauseBtn.addEventListener("click", () => {
  if (running) {
    soundPause.play();
    clearInterval(timerInterval);
    running = false;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }
});

// RESET
resetBtn.addEventListener("click", () => {
  soundReset.play();
  clearInterval(timerInterval);

  running = false;
  elapsedTime = 0;
  display.textContent = "00:00.00";
  lapsContainer.innerHTML = "";

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
});

// LAP
lapBtn.addEventListener("click", () => {
  if (running) {
    soundLap.play();
    const lapItem = document.createElement("div");
    lapItem.classList.add("lap-item");

    lapItem.innerHTML = `
      <span>Lap ${lapsContainer.children.length + 1}</span>
      <span>${formatTime(elapsedTime)}</span>
    `;

    lapsContainer.prepend(lapItem);
  }
});

// DARK/LIGHT MODE
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggleTheme.textContent =
    document.body.classList.contains("dark") ? "☀" : "🌙";
});
