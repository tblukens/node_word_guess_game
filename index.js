var inquirer = require("inquirer");

var Word = require("./Word");

var isLetter = require("is-letter");

var chalk = require("chalk");

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

let hasBeenGuessed = false;

let guessedLetters = [];

let startGame = function () {
    lettersRemaining();
    if (maxGuesses > 0 && wordGuessed === false) {
        if (guessedLetters.length > 0) {
            console.log("Guessed Letters: " + guessedLetters.join(","))
        }
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
            if (!isLetter(guess.letterGuess)) {
                console.log("Please enter a single letter...");
                startGame();
            } else {

                if (guessedLetters.indexOf(guess.letterGuess.toUpperCase()) === -1) {
                    noDuplicate(guess.letterGuess.toUpperCase());
                } else {
                    console.log("Letter has been guessed already. Please give a different letter.");
                    startGame();
                }
            }

            // } PART OF FIX *** ***
        })
    } else if (maxGuesses <= 0) {
        console.log("Sorry, you ran out of guess attempts. :(")
        endGame();
    }
}

let noDuplicate = function (guess) {
    if (wordToGuess.word.indexOf(guess) === -1){
        subtractGuessTotal();
    }
    guessedLetters.push(guess)
    wordToGuess.checkGuessedLetter(guess);
    displayWord();
    console.log("Number of guesses remaining: " + maxGuesses)
    startGame();
}

let subtractGuessTotal = function () {
    maxGuesses--;
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
    if (remaining === 0) {
        wordGuessed = true;
        console.log("You win!")
        endGame();
        return false;
    }
    numberOfLtrsRemaining = remaining;
}

let displayWord = function () {
    wordToGuess.theString();
}

let endGame = function () {
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
    guessedLetters = [];
    wordGuessed = false;
    newGame = true;
    randomWord = listOfWords[Math.floor(listOfWords.length * Math.random())].toUpperCase();
    if (wordToGuess !== undefined) {
        if (randomWord === wordToGuess.word) {
            resetGame();
        }
        else {
            loadWordAndStart();
        }
    } else {
        loadWordAndStart();
    }


}
let loadWordAndStart = function () {
    wordToGuess = new Word(randomWord);
    // logs word for testing ONLY
    //  _____________________________________________
    // console.log(wordToGuess + "\n" + randomWord)
    // ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    lettersRemaining();
    maxGuesses = numberOfLtrsRemaining + 5;
    console.log("Number of guesses: " + maxGuesses)
    startGame();
}

resetGame();
