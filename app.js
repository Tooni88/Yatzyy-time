let data = {
  toni: { score: 0, streak: 0, best: 0 },
  elias: { score: 0, streak: 0, best: 0 }
};

let lastLeader = null;

// Load saved data
function load() {
  const saved = localStorage.getItem("tvse");
  if (saved) {
    data = JSON.parse(saved);
  }
}

// Save data
function save() {
  localStorage.setItem("tvse", JSON.stringify(data));
}

// Add point
function addPoint(player) {
  data[player].score++;

  updateStreaks();
  updateBest();
  checkLeaderChange();

  updateUI();
  save();

  animateScore(player);
}

// Update streaks
function updateStreaks() {
  if (data.toni.score > data.elias.score) {
    data.toni.streak++;
    data.elias.streak = 0;
  } else if (data.elias.score > data.toni.score) {
    data.elias.streak++;
    data.toni.streak = 0;
  }
}

// Update best streaks
function updateBest() {
  if (data.toni.streak > data.toni.best) {
    data.toni.best = data.toni.streak;
  }
  if (data.elias.streak > data.elias.best) {
    data.elias.best = data.elias.streak;
  }
}

// Leader change detection + confetti trigger
function checkLeaderChange() {
  let leader =
    data.toni.score > data.elias.score ? "toni" :
    data.elias.score > data.toni.score ? "elias" :
    null;

  if (leader && lastLeader && leader !== lastLeader) {
    launchConfetti();
  }

  lastLeader = leader;
}

// UI update
function updateUI() {
  document.getElementById("toniScore").textContent = data.toni.score;
  document.getElementById("eliasScore").textContent = data.elias.score;

  document.getElementById("toniStreak").textContent = data.toni.streak;
  document.getElementById("eliasStreak").textContent = data.elias.streak;

  document.getElementById("toniBest").textContent = data.toni.best;
  document.getElementById("eliasBest").textContent = data.elias.best;

  const leaderText =
    data.toni.score > data.elias.score ? "🏆 Toni is leading" :
    data.elias.score > data.toni.score ? "🏆 Elias is leading" :
    "⚖️ It’s a tie";

  document.getElementById("leader").textContent = leaderText;
}

// Reset game
function reset() {
  data.toni.score = 0;
  data.elias.score = 0;
  data.toni.streak = 0;
  data.elias.streak = 0;

  save();
  updateUI();
}

// Small animation when scoring
function animateScore(player) {
  const el = document.getElementById(player + "Score");
  el.classList.add("pop");

  setTimeout(() => {
    el.classList.remove("pop");
  }, 300);
}

// Confetti effect
function launchConfetti() {
  for (let i = 0; i < 50; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = randomColor();
    c.style.animationDuration = (1 + Math.random() * 2) + "s";

    document.body.appendChild(c);

    setTimeout(() => c.remove(), 2500);
  }
}

function randomColor() {
  const colors = ["#fff", "#ff0", "#0ff", "#ff6b6b", "#6bffb8"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Start app
load();
updateUI();
