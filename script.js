let userSeq = [];
let gameSeq = [];
let level = 0;
let highScore = 0;
let started = false;
let colors = ["red", "blue", "green", "yellow"];
let allScores = [];

let startBtn = document.querySelector("#start-btn");
let resetBtn = document.querySelector("#reset-btn");
let okBtn = document.querySelector("#ok-btn");
let levelValue = document.querySelector(".level-value");
let gameOver = document.querySelector(".game-over");
let score = document.querySelector("#score");
let highValue = document.querySelector("#high-score");

startBtn.addEventListener("click", () => {
  if (started == false) {
    started = true;
    startBtn.classList.add("hide");
    resetBtn.classList.remove("hide");
    levelValue.classList.remove("hide");
    levelUp();
  }
});

resetBtn.addEventListener("click", function () {
  resetBtn.classList.add("hide");
  levelValue.classList.add("hide");
  startBtn.classList.remove("hide");
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
});

okBtn.addEventListener("click", function () {
  gameOver.classList.add("hide");
  resetBtn.classList.add("hide");
  levelValue.classList.add("hide");
  startBtn.classList.remove("hide");
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
});

let btns = document.querySelectorAll(".btn");
for (const btn of btns) {
  btn.addEventListener("click", btnPress);
}

function levelUp() {
  level++;
  userSeq = [];
  levelValue.innerText = `Level - ${level}`;
  let randomIdx = Math.floor(Math.random() * 3);
  let randomColor = colors[randomIdx];
  let randonBtn = document.querySelector(`#${randomColor}`);
  gameSeq.push(randomColor);
  btnFlash(randonBtn, "flash");
}

function btnFlash(btn, flashValue) {
  btn.classList.add(flashValue);
  setTimeout(function () {
    btn.classList.remove(flashValue);
  }, 300);
}

function btnPress() {
  if (started == true) {
    btnFlash(this, "user-flash");
    let userColor = this.getAttribute("id");
    userSeq.push(userColor);
    checkSeq(userSeq.length - 1);
  }
}

function checkSeq(idx) {
  if (gameSeq[idx] == userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver.classList.remove("hide");
    score.innerText = `${level}`;
    allScores.push(level);
    console.log("scores ", allScores);
    updateHigh();
  }
}
function updateHigh() {
  for (const score of allScores) {
    if (score > highScore) {
      highScore = score;
      highValue.innerText = score;
    }
  }
}
