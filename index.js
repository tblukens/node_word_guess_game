var inquirer = require("inquirer");

var Word = require("./Word");

var listOfWords = [
    "WORD",
    "Another",
    "Thenanother",
    "Superwordontop"
];

var newGame = true;

var maxGuesses = 10;

var numberOfLtrsRemaining = 0;

var randomWord = listOfWords[Math.floor(listOfWords.length * Math.random())];

var wordToGuess = new Word(randomWord.toUpperCase())

console.log(randomWord);

var startGame = function () {
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
        console.log(guess.letterGuess.toUpperCase())
        displayWord();
        maxGuesses--;
        console.log("Number of guesses remaining: "+maxGuesses)
        startGame();
    })
}

var lettersRemaining = function() {
    var remaining = 0;
    for (let i = 0; i < wordToGuess; i++) {
        const element = wordToGuess[i];
        console.log(element)
        // if(element === "_") {
        //     remaining++;
        // }
    }
    console.log(remaining)
}

var displayWord = function () {
    wordToGuess.theString();
}

lettersRemaining();
// startGame();
