const startBtn = document.querySelector('.start-btn');
const gameContainer = document.querySelector('.game-container');

const setNumberBtn = document.querySelector('.set-number-btn');
const guessBtns = document.querySelectorAll('.guess-btn');
const guessMessages = document.querySelectorAll('.guess-message');
const guessInputs = document.querySelectorAll('.guess-number');
const attemptsLeftSpans = document.querySelectorAll('.attempts-count');
const resetBtn = document.querySelector('.reset-btn');

let targetNumber;
let guessesLeft = 5; // Adjust as needed

// Start game functionality
startBtn.addEventListener('click', () => {
  gameContainer.hidden = false; // Make game container visible
  startBtn.hidden = true; // Hide start button

  // Reset game state on start
  targetNumber = undefined;
  guessesLeft = 5;
  attemptsLeftSpans.forEach(span => span.textContent = guessesLeft); // Update guess counters
  guessInputs.forEach(input => {
    input.value = ''; // Clear guess input fields
    input.disabled = true; // Initially disable guess buttons
  });
  guessMessages.forEach(message => message.textContent = ''); // Clear messages
  setNumberBtn.disabled = false; // Enable set number button
});

// Set number functionality
setNumberBtn.addEventListener('click', () => {
  targetNumber = parseInt(document.querySelector('.set-number').value);
  if (!isNaN(targetNumber)) {
    setNumberBtn.disabled = true;
    guessInputs.forEach(input => input.disabled = false); // Enable guess buttons
  } else {
    alert('Please enter a valid number!');
  }
});

// Guessing functionality (for both guessers)
guessBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const guess = parseInt(guessInputs[index].value);
    if (!isNaN(guess)) {
      guessesLeft--;
      attemptsLeftSpans[index].textContent = guessesLeft; // Update individual guess counter

      if (guess === targetNumber) {
        guessMessages[index].textContent = `You guessed it right!`;
        guessBtns.forEach(b => b.disabled = true); // Disable all guess buttons
      } else {
        guessMessages[index].textContent = guess > targetNumber ? 'Too High!' : 'Too Low!';
        guessInputs[index].disabled = true; // Disable specific guesser's button
        if (guessesLeft === 0) {
          guessMessages.forEach(message => message.textContent = `You ran out of guesses! The number was ${targetNumber}`); // Display for both guessers
          guessBtns.forEach(b => b.disabled = true); // Disable all guess buttons
        }
      }
    } else {
      alert('Please enter a valid number!');
    }
  });
});

// Reset game functionality
resetBtn.addEventListener('click', () => {
  // Reset game state as in startBtn listener
  targetNumber = undefined;
  guessesLeft = 5;
  attemptsLeftSpans.forEach(span => span.textContent = guessesLeft);
  guessInputs.forEach(input => {
    input.value = '';
    input.disabled = true;
  });
  guessMessages.forEach(message => message.textContent = '');
  setNumberBtn.disabled = false;
});
