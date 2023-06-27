document.addEventListener("DOMContentLoaded", () => {
  let number = parseInt(prompt("몇 명이서 참가하시나요?")); // 몇 명 참가하는지?
  const order = document.querySelector("#order"); // n번째 참가자 창
  const word = document.querySelector("#word"); // 제시어 생기는 창
  const input = document.querySelector("#input"); // typeof => String // 제시어 입력하는 창
  const button = document.querySelector("#button"); // 입력 버튼
  const restartButton = document.querySelector("#restartButton"); // 재시작 버튼
  let i = 1;
  const regex = /^[ㄱ-ㅎ|가-힣]+$/; // 입력값에 한글만 받도록 하기
  let words = []; // 입력된 단어들을 담을 빈 배열

  //프롬트 창에서 숫자가 아닌 값을 받을 때, 다시 띄울 창
  while (isNaN(number)) {
    number = parseInt(prompt("숫자를 입력하세요"));
  }

  button.addEventListener("click", () => {
    let orderValue = Number(order.textContent); // n번째 참가자의 n
    let inputWord = document.getElementById("input").value; // 인풋창에 입력되는 단어

    if (inputWord.length === 1) {
      alert("단어를 잘못 입력하셨습니다. 게임이 끝났습니다.");
      button.disabled = true; // 입력 버튼 비활성화
      restartButton.disabled = false; // 재시작 버튼 활성화
      return; // 함수 종료
    }

    if (orderValue == number) {
      // 참가자 수와 n이 같다면
      order.textContent = "1";
    } else {
      order.textContent = orderValue + 1; // 3번째 참가자라고 표시되는 것은 3번째 참가자가 입력하기 전인 것
    }
    if (regex.test(inputWord) == false) {
      // 입력값이 문자열이 아니라면
      alert("단어를 다시 입력하세요" + i++ + "/ 3");
      input.value = "";
      if (i > 3) {
        alert("값을 잘못 입력하셨습니다. 게임이 끝났습니다."); // 아예 창이 아무것도 안뜨게 하기
        button.disabled = true; // 입력 버튼 비활성화
        restartButton.disabled = false; // 재시작 버튼 활성화
      }
    } else {
      // 입력값이 제대로 입력됐다면
      // 입력받았던 값의 끝 글자와 입력값의 첫 글자가 이어진다면
      let wordsLength = words.length; // 단어를 담을 배열의 길이
      if (wordsLength == 0) {
        // 아무런 단어도 아직 받지 않았을 때
        word.append(inputWord + " - "); // span 창에 단어 띄우기
        words.push(inputWord); // 배열에 단어 추가
      } else {
        // 단어를 이미 받은 후라면
        let preWord = words[words.length - 1]; // 입력에 받은 마지막 단어
        if (preWord.substr(-1) == inputWord.substr(0, 1)) {
          word.append(inputWord + " - ");
          words.push(inputWord);
        } else {
          alert("단어를 잘못 입력하셨습니다. 게임이 끝났습니다");
          button.disabled = true; // 입력 버튼 비활성화
          restartButton.disabled = false; // 재시작 버튼 활성화
        }
      }
      input.value = ""; // 인풋창 초기화
    }
  });

  restartButton.addEventListener("click", () => {
    order.textContent = "1";
    word.textContent = "";
    input.value = "";
    button.disabled = false; // 입력 버튼 활성화
    restartButton.disabled = true; // 재시작 버튼 비활성화
    words = []; // 단어 배열 초기화
    i = 1;
  });
});
