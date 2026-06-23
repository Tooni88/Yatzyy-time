localStorage.removeItem("tvse");

let data = {
  toni: {
    score: 0,
    streak: 0,
    best: 0
  },
  elias: {
    score: 0,
    streak: 0,
    best: 0
  }
};

function updateUI() {
  document.getElementById("toniScore").textContent = data.toni.score;
  document.getElementById("eliasScore").textContent = data.elias.score;

  document.getElementById("toniStreak").textContent = data.toni.streak;
  document.getElementById("eliasStreak").textContent = data.elias.streak;

  document.getElementById("toniBest").textContent = data.toni.best;
  document.getElementById("eliasBest").textContent = data.elias.best;

  document.getElementById("leader").textContent = "⚖️ It's a tie";
}

function addPoint(player) {
  data[player].score++;

  if (data.toni.score > data.elias.score) {
    data.toni.streak++;
    data.elias.streak = 0;
  } else if (data.elias.score > data.toni.score) {
    data.elias.streak++;
    data.toni.streak = 0;
  }

  if (data.toni.streak > data.toni.best) {
    data.toni.best = data.toni.streak;
  }

  if (data.elias.streak > data.elias.best) {
    data.elias.best = data.elias.streak;
  }

  localStorage.setItem("tvse", JSON.stringify(data));

  updateUI();
}

function reset() {
  localStorage.removeItem("tvse");

  data = {
    toni: {
      score: 0,
      streak: 0,
      best: 0
    },
    elias: {
      score: 0,
      streak: 0,
      best: 0
    }
  };

  updateUI();
}

updateUI();
