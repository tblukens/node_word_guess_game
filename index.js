const inquirer = require("inquirer");

const Word = require("./Word");

const isLetter = require("is-letter");

const chalk = require('chalk');
const log = console.log;

const listOfWords = [
    "Final Fantasy",
    "Chrono Trigger",
    "Legend of Zelda",
    "Kingdom Hearts",
    "World of Warcraft",
    "Fallout",
    "Metal Gear Solid",
    "Elder Scrolls",
    "Super Mario Bros",
    "Grand Theft Auto",
    
];

let newGame = true;

let wordGuessed = false;

let maxGuesses;

let numberOfLtrsRemaining;

let randomWord;

let wordToGuess;

let guessedLetters = [];

let startGame = function () {
    lettersRemaining();
    if (maxGuesses > 0 && wordGuessed === false) {
        if (guessedLetters.length > 0) {
            console.log("\nGuessed Letters: " + chalk.green(" " + guessedLetters.join(",")+" \n"))
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
        console.log(chalk.red.inverse("\n Sorry, you ran out of guess attempts. :( \n"))
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
    let repeater = 43;
    log(chalk.red.inverse("\n"+"¯".repeat(repeater)+"\n Sorry, that was not one of the letters... \n"+"_".repeat(repeater)+"\n"))
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
        console.log(chalk.cyan.inverse("\n"+"¯".repeat(10)+"\n You win! \n"+"_".repeat(10)+"\n"));
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
    console.log(randomWord)
    // ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    lettersRemaining();

    maxGuesses = numberOfLtrsRemaining + 5;
    console.log(chalk.yellow.inverse("\n Number of guesses: " + maxGuesses+" \n"))
    startGame();
}

const welcome = " Welcome to Word Guess: Video Games!!! "
log(chalk.bold.bgCyan("¯".repeat(welcome.length)+"\n"+welcome+"\n"+"_".repeat(welcome.length)))

resetGame();