let data = {
  toni: { score: 0, streak: 0, best: 0 },
  elias: { score: 0, streak: 0, best: 0 },
  lastLeader: null
};

function load() {
  const saved = localStorage.getItem("tvse");
  if (saved) data = JSON.parse(saved);
}

function save() {
  localStorage.setItem("tvse", JSON.stringify(data));
}

function addPoint(player) {
  data[player].score++;

  updateStreaks();
  updateBest();
  updateUI();
  save();
}

function updateStreaks() {
  if (data.toni.score > data.elias.score) {
    data.toni.streak++;
    data.elias.streak = 0;
  } 
  else if (data.elias.score > data.toni.score) {
    data.elias.streak++;
    data.toni.streak = 0;
  }
}

function updateBest() {
  if (data.toni.streak > data.toni.best) data.toni.best = data.toni.streak;
  if (data.elias.streak > data.elias.best) data.elias.best = data.elias.streak;
}

function updateUI() {
  document.getElementById("toniScore").textContent = data.toni.score;
  document.getElementById("eliasScore").textContent = data.elias.score;

  document.getElementById("toniStreak").textContent = data.toni.streak;
  document.getElementById("eliasStreak").textContent = data.elias.streak;

  document.getElementById("toniBest").textContent = data.toni.best;
  document.getElementById("eliasBest").textContent = data.elias.best;

  const leader =
    data.toni.score > data.elias.score ? "🏆 Toni is leading" :
    data.elias.score > data.toni.score ? "🏆 Elias is leading" :
    "⚖️ It’s a tie";

  document.getElementById("leader").textContent = leader;
}

function reset() {
  data.toni.score = 0;
  data.elias.score = 0;
  data.toni.streak = 0;
  data.elias.streak = 0;

  updateUI();
  save();
}

load();
updateUI();