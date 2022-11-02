"use strict";

const keyboard = [
  { name: "KeyQ", type: "usual", imgPath: "./images/Q.png" },
  { name: "KeyW", type: "usual", imgPath: "./images/W.png" },
  { name: "KeyE", type: "usual", imgPath: "./images/E.png" },
  { name: "KeyR", type: "usual", imgPath: "./images/R.png" },
  { name: "KeyT", type: "usual", imgPath: "./images/T.png" },
  { name: "KeyY", type: "usual", imgPath: "./images/Y.png" },
  { name: "KeyU", type: "usual", imgPath: "./images/U.png" },
  { name: "KeyI", type: "usual", imgPath: "./images/I.png" },
  { name: "KeyO", type: "usual", imgPath: "./images/O.png" },
  { name: "KeyP", type: "usual", imgPath: "./images/P.png" },
  { name: "KeyA", type: "usual", imgPath: "./images/A.png" },
  { name: "KeyS", type: "usual", imgPath: "./images/S.png" },
  { name: "KeyD", type: "usual", imgPath: "./images/D.png" },
  { name: "KeyF", type: "usual", imgPath: "./images/F.png" },
  { name: "KeyG", type: "usual", imgPath: "./images/G.png" },
  { name: "KeyH", type: "usual", imgPath: "./images/H.png" },
  { name: "KeyJ", type: "usual", imgPath: "./images/J.png" },
  { name: "KeyK", type: "usual", imgPath: "./images/K.png" },
  { name: "KeyL", type: "usual", imgPath: "./images/L.png" },
  { name: "KeyZ", type: "usual", imgPath: "./images/Z.png" },
  { name: "KeyX", type: "usual", imgPath: "./images/X.png" },
  { name: "KeyC", type: "usual", imgPath: "./images/C.png" },
  { name: "KeyV", type: "usual", imgPath: "./images/V.png" },
  { name: "KeyB", type: "usual", imgPath: "./images/B.png" },
  { name: "KeyN", type: "usual", imgPath: "./images/N.png" },
  { name: "KeyM", type: "usual", imgPath: "./images/M.png" },
];

function getRandomButtonIndex() {
  return Math.floor(Math.random() * keyboard.length);
}
const mainContainer = document.querySelector(".letter_container");

// creating points container markup
const pointsContainer = document.createElement("div");
pointsContainer.classList.add("score");
const h2 = document.createElement("h2");
const span = document.createElement("span");
span.classList.add("points_amount");
const h3 = document.createElement("h3");
h3.classList.add("golden_total");
const div = document.createElement("div");
const span1 = document.createElement("span");
span1.classList.add("golden_total-letters");
const span2 = document.createElement("span");
span2.classList.add("golden_total-points");
const newStart = document.createElement("button");
newStart.classList.add("new_game");
newStart.textContent = "New Game";
//
pointsContainer.appendChild(h2);
pointsContainer.appendChild(span);
pointsContainer.appendChild(h3);
pointsContainer.appendChild(div);
div.appendChild(span1);
div.appendChild(span2);

// points
const usualPoints = 15;
const goldenPoints = usualPoints * 2;
let countGoldenButtons = 0;
let countGoldenButtonPoints = 0;
let countUsualButtonsPoints = 0;
let totalPoints = 0;

// start/end
let isPlaying = false;
const startButton = document.createElement("button");
startButton.classList.add("start");
startButton.textContent = "Start";
mainContainer.appendChild(startButton);
// timer
const timerValue = document.createElement("h1");
timerValue.classList.add("timer");
// start events
startButton.addEventListener("click", startGame);

//key mathcing event
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  // console.log(event.code);
  let pressedKeyName = event.code;
  let fallingKey = document.querySelector(`.${pressedKeyName}`);
  if (fallingKey) {
    fallingKey.remove();
    // success
    if (isPlaying) {
      if (fallingKey.classList.contains("golden")) {
        countGoldenButtonPoints += goldenPoints;
        countGoldenButtons += 1;
      } else {
        countUsualButtonsPoints += usualPoints;
      }

      totalPoints = countUsualButtonsPoints + countGoldenButtonPoints;
      h2.textContent = "Total";
      span.textContent = totalPoints;
      h3.textContent = "Golden Letters:";
      span1.textContent = `x${countGoldenButtons} : `;
      span2.textContent = countGoldenButtonPoints;
    }
  }
});
// sapwn letter in window
function createLetter() {
  let randomButton = keyboard[getRandomButtonIndex()];
  const container = document.createElement("div");
  const letter = document.createElement("span");
  const letterChar = randomButton.name.split("");
  letter.textContent = letterChar[3].toUpperCase();
  container.classList.add(randomButton.name);
  container.classList.add("letter");
  // randomly sets golden letter
  const randomNamber = Math.floor(Math.random() * 5);
  if (randomNamber === 1) {
    container.classList.add("golden");
  } else if (container.classList.contains("golden")) {
    container.classList.remove("golden");
  }
  //
  container.appendChild(letter);
  mainContainer.appendChild(container);
  let isGolden = container.classList.contains("golden");
  let x = Math.floor(Math.random() * 90) + 10 + "%";
  let end = window.innerHeight + "px";
  container.animate(
    [
      { top: `-2.5vh`, left: `${x}` },
      {
        top: `${end}`,
        left: `${x}`,
        transform: isGolden ? "rotateY(360deg)" : "rotateY(0deg)",
      },
    ],
    {
      duration: isGolden ? 2000 : 5000,
      easing: isGolden ? "ease-in" : "linear",
      fill: "both",
    }
  );
  Promise.all(
    container.getAnimations().map((animation) => animation.finished)
  ).then(() => container.remove());
}

function startGame() {
  pointsContainer.remove();
  startButton.removeEventListener("click", startGame);
  newStart.removeEventListener("click", startGame);
  startButton.remove();
  const timerValue = document.createElement("h1");
  timerValue.classList.add("timer");
  timerValue.textContent = 20;
  mainContainer.appendChild(timerValue);
  // timer count
  function handleTimerCount() {
    isPlaying = true;
    countGoldenButtons = 0;
    countGoldenButtonPoints = 0;
    countUsualButtonsPoints = 0;
    totalPoints = 0;
    span.textContent = 0;
    const countdown = setInterval(count, 1000);
    //
    const nextLetter = setInterval(() => {
      createLetter();
    }, 700);

    function count() {
      if (timerValue.textContent == 0) {
        clearInterval(countdown);
        clearInterval(nextLetter);
        while (mainContainer.firstChild) {
          mainContainer.firstChild.remove();
        }
        timerValue.textContent = null;
        isPlaying = false;
        mainContainer.appendChild(pointsContainer);
        pointsContainer.appendChild(newStart);
        newStart.addEventListener("click", startGame);
      } else {
        timerValue.textContent--;
      }
    }
  }
  handleTimerCount();
}
