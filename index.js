"use strict";

const keyboard = [
  { name: "KeyQ" },
  { name: "KeyW" },
  { name: "KeyE" },
  { name: "KeyR" },
  { name: "KeyT" },
  { name: "KeyY" },
  { name: "KeyU" },
  { name: "KeyI" },
  { name: "KeyO" },
  { name: "KeyP" },
  { name: "KeyA" },
  { name: "KeyS" },
  { name: "KeyD" },
  { name: "KeyF" },
  { name: "KeyG" },
  { name: "KeyH" },
  { name: "KeyJ" },
  { name: "KeyK" },
  { name: "KeyL" },
  { name: "KeyZ" },
  { name: "KeyX" },
  { name: "KeyC" },
  { name: "KeyV" },
  { name: "KeyB" },
  { name: "KeyN" },
  { name: "KeyM" },
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

// start
let isPlaying = false;
const startButton = document.createElement("button");
startButton.classList.add("start");
startButton.textContent = "Start";
mainContainer.appendChild(startButton);
// timer
const timerValue = document.createElement("h1");
timerValue.classList.add("timer");
// start event
startButton.addEventListener("click", startGame);

//key mathcing event
document.addEventListener("keydown", (event) => {
  event.preventDefault();
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
    }
  }
});
// create letter in window
function createLetter() {
  let randomButton = keyboard[getRandomButtonIndex()];
  const container = document.createElement("div");
  const letter = document.createElement("span");
  const letterChar = randomButton.name.split("");
  letter.textContent = letterChar[3].toUpperCase();
  container.classList.add(randomButton.name);
  container.classList.add("letter");
  // randomly sets golden letter
  const randomNumber = Math.floor(Math.random() * 5);
  if (randomNumber === 1) {
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
  // remove letter when it`s winished anmation what equals that letter get to the end of display
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
        // points calc
        totalPoints = countUsualButtonsPoints + countGoldenButtonPoints;
        h2.textContent = "Total";
        span.textContent = totalPoints;
        h3.textContent = "Golden Letters:";
        span1.textContent = `x${countGoldenButtons} : `;
        span2.textContent = countGoldenButtonPoints;
        mainContainer.appendChild(pointsContainer);
        pointsContainer.appendChild(newStart);
        //
        newStart.addEventListener("click", startGame);
      } else {
        timerValue.textContent--;
      }
    }
  }
  handleTimerCount();
}
