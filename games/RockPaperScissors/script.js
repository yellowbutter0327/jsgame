const dictionary = {
  바위: "0px",
  가위: "-300px",
  보: "-630px",
};

const score = {
  가위: 1,
  바위: 0,
  보: -1,
};

let playTime = 0;
let winNumber = 0;
let loseNumber = 0;
let drawNumber = 0;

const result = document.getElementById("result");
const restart = document.getElementById("restart");
const winner = document.getElementById("winner");

function getComputerChoice(imagePosition) {
  return Object.keys(dictionary).find(
    (key) => dictionary[key] === imagePosition
  );
}

function updateResult() {
  result.innerHTML = `${playTime}번의 게임을 하셨습니다. <br><br>  승리 ${winNumber}번  패배 ${loseNumber}번  무승부 ${drawNumber}번 `;
}

function intervalMaker() {
  let imagePosition = dictionary.바위;
  const computer = document.querySelector("#computer");

  return setInterval(() => {
    if (imagePosition === dictionary.바위) {
      imagePosition = dictionary.가위;
    } else if (imagePosition === dictionary.가위) {
      imagePosition = dictionary.보;
    } else {
      imagePosition = dictionary.바위;
    }
    computer.style.background = `url(game.jpg) ${imagePosition} 0`;
  }, 100);
}

let interval = intervalMaker();

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", function () {
    clearInterval(interval);
    interval = intervalMaker();
    restart.style.display = "inline-block";
    const myPick = this.textContent;
    const myScore = score[myPick];
    const imagePosition = getComputedStyle(computer).backgroundPositionX;
    const computerScore = score[getComputerChoice(imagePosition)];
    const scoreGap = myScore - computerScore;
    handleResult(scoreGap);
  });
});

// 사용자 점수와 컴퓨터 점수의 차이에 따라 승패를 결정한다.
function handleResult(scoreGap) {
  if (playTime < 5) {
    if (scoreGap === 0) {
      drawNumber++;
      alert("비겼다 !");
    } else if ([-1, 2].includes(scoreGap)) {
      winNumber++;
      alert("이겼다 !");
    } else {
      loseNumber++;
      alert("졌다 !");
    }
    playTime++;
    updateResult(); // 결과 표시
  }

  if (playTime === 5) {
    if (winNumber > loseNumber) {
      document.getElementById("winner").innerText = "승리!";
    } else if (winNumber < loseNumber) {
      document.getElementById("winner").innerText = "패배!";
    } else {
      document.getElementById("winner").innerText = "무승부!";
    }
    winner.style.display = "inline-block";
  }
}

function resetGame() {
  playTime = 0;
  winNumber = 0;
  loseNumber = 0;
  drawNumber = 0;
  updateResult();
  winner.innerText = "";
  winner.style.display = "none";
  restart.style.display = "none";
}

restart.addEventListener("click", resetGame);
