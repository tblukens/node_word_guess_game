const inquirer = require("inquirer");

const Word = require("./Word");

const isLetter = require("is-letter");

const chalk = require('chalk');
const log = console.log;

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
            console.log("\nGuessed Letters: " + chalk.green.inverse(" " + guessedLetters.join(",")+" \n"))
        }
        if (newGame === true) {
            newGame = false;
            displayWord();
        }
        inquirer.prompt([
            {
                name: "letterGuess",
                message: chalk.blue.inverse("Guess a letter: "),
            }
        ]).then(function (guess) {
            if (!isLetter(guess.letterGuess)) {
                log(chalk.red("\nPlease enter a single letter...\n"));
                startGame();
            } else {

                if (guessedLetters.indexOf(guess.letterGuess.toUpperCase()) === -1) {
                    noDuplicate(guess.letterGuess.toUpperCase());
                } else {
                    console.log(chalk.red("\nLetter has been guessed already. Please give a different letter.\n"));
                    startGame();
                }
            }

            // } PART OF FIX *** ***
        })
    } else if (maxGuesses <= 0) {
        console.log(chalk.red.inverse("\n Sorry, you ran out of guess attempts. :( \n "))
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
    console.log(chalk.yellow.inverse("\nNumber of guesses remaining: " + maxGuesses + " "))
    startGame();
}

let subtractGuessTotal = function () {
    log(chalk.red.inverse("\n¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\nSorry, that was not one of the letters...\n_________________________________________\n"))
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
        console.log("\n¯¯¯¯¯¯¯¯¯¯¯¯\nYou win!\n____________\n")
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
        message: chalk.cyan.inverse("Would you like to play again?")
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
    console.log(chalk.yellow.inverse("\n Number of guesses: " + maxGuesses+" \n"))
    startGame();
}

resetGame();
