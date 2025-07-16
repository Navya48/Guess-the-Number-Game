let randomNumber;
let guesses = [];
let attemptsLeft = 10;

const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitGuess');
const message = document.getElementById('message');
const previous = document.getElementById('previousGuesses');
const remaining = document.getElementById('guessesRemaining');
const resetBtn = document.getElementById('resetGame');

function startGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guesses = [];
  attemptsLeft = 10;

  message.textContent = '';
  message.className = '';
  previous.textContent = 'Previous guesses: ';
  remaining.textContent = `Attempts left: ${attemptsLeft}`;

  guessInput.value = '';
  guessInput.disabled = false;
  submitBtn.disabled = false;
  resetBtn.classList.add('hidden');
  guessInput.focus();

    console.log(' New number:', randomNumber); // For testing
}

  function checkGuess() {
  const guess = Number(guessInput.value);

  if (guess < 1 || guess > 100 || isNaN(guess)) {
    showMessage('Enter a number between 1 and 100.', 'warning');
    return;
  }

  guesses.push(guess);
  previous.textContent = 'Previous guesses: ' + guesses.join(', ');
  attemptsLeft--;
  remaining.textContent = `Attempts left: ${attemptsLeft}`;

  if (guess === randomNumber) {
    showMessage(` You guessed it! The number was ${randomNumber}.`, 'success');
    endGame();
  } else if (attemptsLeft === 0) {
    showMessage(` Game over! The number was ${randomNumber}.`, 'error');
    endGame();
  } else {
    showMessage(guess < randomNumber ? 'Too low!' : ' Too high!', 'error');
  }

  guessInput.value = '';
  guessInput.focus();
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = type; // CSS will handle the color (success, error, warning)
}

function endGame() {
  guessInput.disabled = true;
  submitBtn.disabled = true;
  resetBtn.classList.remove('hidden');
}

submitBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', startGame);

guessInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkGuess();
});

window.onload = startGame;








