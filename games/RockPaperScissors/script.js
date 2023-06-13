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

function getComputerChoice(imagePosition) {
  return Object.keys(dictionary).find(
    (key) => dictionary[key] === imagePosition
  );
}

function updateResult() {
  result.innerHTML = `${playTime}번의 게임을 하셨습니다. <br><br> ${winNumber}번 승 ${loseNumber}번 패 ${drawNumber}번 무`;
}

//사용자 점수와 컴퓨터 점수의 차이에 따라 승패를 결정한다.
function handleResult(scoreGap) {
  if (scoreGap === 0) {
    alert("비겼다 !");
    drawNumber++;
  } else if ([-1, 2].includes(scoreGap)) {
    alert("이겼다 !");
    winNumber++;
  } else {
    alert("졌다 !");
    loseNumber++;
  }
  updateResult();
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
  }, 600);
}

let interval = intervalMaker();

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", function () {
    clearInterval(interval);
    interval = intervalMaker();
    playTime++;
    restart.style.display = "inline-block";
    const myPick = this.textContent;
    const myScore = score[myPick];
    const imagePosition = getComputedStyle(computer).backgroundPositionX;
    const computerScore = score[getComputerChoice(imagePosition)];
    const scoreGap = myScore - computerScore;
    handleResult(scoreGap);
  });
});

function resetGame() {
  playTime = 0;
  winNumber = 0;
  loseNumber = 0;
  drawNumber = 0;
  updateResult();
}

restart.addEventListener("click", resetGame);
