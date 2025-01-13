// variables
const gameContainer = document.getElementById("game-container");
const wordDisplay = document.getElementById("word-display");
const livesDisplay = document.getElementById("lives");
const messageDisplay = document.getElementById("message");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");

// word list (movies)
const words = ["inception", "matrix", "avatar", "titanic", "jaws", "gladiator"];

let chosenWord = "";
let guessedLetters = [];
let lives = 6;


function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    lives = 6;
    updateDisplay();
    messageDisplay.innerText = "Start guessing letters!";
}


function updateDisplay() {
    let displayWord = chosenWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
    wordDisplay.innerText = displayWord;
    livesDisplay.innerText = `Lives: ${lives}`;

    if (!displayWord.includes("_")) {
        messageDisplay.innerText = "🎉 You win!";
        endGame();
    }

    if (lives === 0) {
        messageDisplay.innerText = `😢 Game over! The word was '${chosenWord}'`;
        endGame();
    }
}


function handleGuess() {
    const guess = guessInput.value.toLowerCase();
    if (!guess || guess.length !== 1) {
        messageDisplay.innerText = "Please enter a single letter.";
        return;
    }

    if (guessedLetters.includes(guess)) {
        messageDisplay.innerText = "You've already guessed that letter.";
        return;
    }

    guessedLetters.push(guess);

    if (chosenWord.includes(guess)) {
        messageDisplay.innerText = "Good guess!";
    } else {
        lives--;
        messageDisplay.innerText = "Wrong guess!";
    }

    updateDisplay();
    guessInput.value = "";
}


function endGame() {
    guessButton.disabled = true;
    guessInput.disabled = true;
}


function restartGame() {
    guessButton.disabled = false;
    guessInput.disabled = false;
    startGame();
}

// Event listeners
guessButton.addEventListener("click", handleGuess);
window.addEventListener("load", startGame);