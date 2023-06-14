const startWords = ["우리말", "끝말잇기", "게임"];
const index = Math.floor(Math.random() * 3);
let word = startWords[index];

const keyWord = document.querySelector(".keyword");
let time = 10;
const timeZone = document.querySelector(".timeZone");
