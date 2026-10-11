const state = {
  ropePos: 50,
  startTime: Date.now(),
  teams: {
    1: { currentInput: "", answer: 0, score: 0 },
    2: { currentInput: "", answer: 0, score: 0 },
  },
};

function generateProblem(teamId) {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  state.teams[teamId].answer = num1 + num2;
  const eqnElement = document.getElementById(`eqn-${teamId}`);
  if (eqnElement) eqnElement.innerText = `${num1} + ${num2} = ?`;
}

function startTimer() {
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");
    const timerElement = document.getElementById("timer");
    if (timerElement) timerElement.innerText = `${mins}:${secs}`;
  }, 1000);
}

function checkAnswer(teamId) {
  const team = state.teams[teamId];
  if (parseInt(team.currentInput) === team.answer) {
    team.score++;
    document.getElementById(`score-${teamId}`).innerText = team.score;
    document.getElementById(`score-${teamId}-outer`).innerText = team.score;

    state.ropePos += teamId === "1" ? -5 : 5;
    updateRope();
    generateProblem(teamId);
  }
  team.currentInput = "";
  document.getElementById(`disp-${teamId}`).innerText = "0";
}

function updateRope() {
  const flag = document.getElementById("flag");
  state.ropePos = Math.max(5, Math.min(95, state.ropePos));
  flag.style.left = state.ropePos + "%";

  if (state.ropePos <= 10) endGame("Team 1 Wins!");
  if (state.ropePos >= 90) endGame("Team 2 Wins!");
}

function endGame(message) {
  alert(message);
  location.reload();
}

// Set up the button clicks
document.querySelectorAll(".keypad button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const teamId = btn.closest(".keypad").dataset.team;
    const val = btn.dataset.val;
    const team = state.teams[teamId];

    if (val === "check") {
      checkAnswer(teamId);
    } else if (val === "clear") {
      team.currentInput = "";
      document.getElementById(`disp-${teamId}`).innerText = "0";
    } else {
      team.currentInput += val;
      document.getElementById(`disp-${teamId}`).innerText = team.currentInput;
    }
  });
});

// INITIALIZE GAME
startTimer();
generateProblem("1");
generateProblem("2");
