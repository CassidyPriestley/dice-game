'use strict';

// Select elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// DECLARE VARIABLES OUTSIDE INIT FUNCTION SO THEY CAN BE USED OUTSIDE FUNCTION SCOPE
let scores, currentScore, activePlayer, playing;
// CREATE INIT FUNCTION
function init() {
  // STARTING CONDITIONS
  // CURRENT SCORE COUNTER
  scores = [0, 0]; // Where we will store both players total scores
  currentScore = 0;
  activePlayer = 0;
  playing = true; // Track the game to disable buttons
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner'); //JS does not care if the element has the
  player1El.classList.remove('player--winner'); // the class or not, it will still remove it
  player0El.classList.add('player--active'); // if the class is there it wont add a second one
  player1El.classList.remove('player--active');
}
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Below we are reassigning the activePlayer
  activePlayer = activePlayer === 0 ? 1 : 0;
  // change the background to the active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLL DICE FUNCTION
rollBtn.addEventListener('click', function () {
  if (playing) {
    // GENERATE RANDOM NUMBER FOR DICE ROLL
    let randNum = Math.floor(Math.random() * 6) + 1;

    // DISPLAY DICE
    diceEl.classList.remove('hidden');
    // diceEl.src = `dice-${randNum}.png` -- Two ways to do this
    diceEl.setAttribute('src', 'dice-' + randNum + '.png');

    // CHECK IF 1 WAS ROLLED: IF TRUE SWITCH TO NEXT PLAYER
    if (randNum !== 1) {
      // ADD DICE TO CURRENT SCORE
      currentScore += randNum;
      // building ID name dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});
// HOLD BUTTON FUNCTION
holdBtn.addEventListener('click', function () {
  if (playing) {
    // FIRST ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    // EX: scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // CHECK IF >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--actiive');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// RESET GAME USE INIT FUNCTION TO RESET EVERYTHING
newBtn.addEventListener('click', init);
