var inquirer = require("inquirer");

var Word = require("./Word");

const listOfWords = [
    "word",
    "quote",
    "test",
    "rest",
    "ash",
    "bed",
    "rock",
    "wreck"
];

let newGame = true;

let wordGuessed = false;

let maxGuesses;

let numberOfLtrsRemaining;

let randomWord;

let wordToGuess;

let startGame = function () {
    lettersRemaining();
    console.log(maxGuesses + " max guesses.")
    if (maxGuesses > 0 && wordGuessed === false) {
        if (newGame === true) {
            newGame = false;
            displayWord();
        }
        inquirer.prompt([
            {
                name: "letterGuess",
                message: "Guess a letter...",
            }
        ]).then(function (guess) {
            wordToGuess.checkGuessedLetter(guess.letterGuess.toUpperCase());
            // console.log(guess.letterGuess.toUpperCase())
            displayWord();
            maxGuesses--;
            // console.log("Number of guesses remaining: " + maxGuesses)
            startGame();
        })
    } else if (maxGuesses <= 0) {
        console.log("GAME OVER")
        endGame();
    }
}

let lettersRemaining = function () {
    let remaining = wordToGuess.wholeWord.length;
    for (let i = 0; i < wordToGuess.wholeWord.length; i++) {
        const element = wordToGuess.wholeWord[i].guessed;
        if (element === true) {
            remaining--;
        } else {

        }
    }
    console.log("remaining: " + remaining)
    if (remaining === 0) {
        wordGuessed = true;
        console.log("You win!")
        endGame();
        return false;
    }
    numberOfLtrsRemaining = remaining;
    // console.log(remaining)
    console.log("Number of letters remaining: " + numberOfLtrsRemaining)
}

let displayWord = function () {
    wordToGuess.theString();
}

let endGame = function () {
    // console.log("Would you like to play again?")
    inquirer.prompt([{
        name: "newgame",
        type: "confirm",
        message: "Would you like to play again?"
    }]).then(function (answer) {
        if (answer.newgame === true) {
            resetGame();
        } else {
            return false;
        }
    })


}

let resetGame = function () {
    wordGuessed = false;
    newGame = true;
    randomWord = listOfWords[Math.floor(listOfWords.length * Math.random())].toUpperCase();
    if (randomWord = wordToGuess.word) {
        resetGame();
    } else {
        wordToGuess = new Word(randomWord);
        console.log(wordToGuess + "\n" + randomWord)
        lettersRemaining();
        maxGuesses = numberOfLtrsRemaining + 5;
        startGame();
    }
}

resetGame();
