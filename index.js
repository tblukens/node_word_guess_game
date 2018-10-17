var inquirer = require("inquirer");

var Word = require("./Word");

var isLetter = require("is-letter");

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

                // *** NEEDS FIX ***
                // if (guessedLetters.length > 0) {
                //     guessedLetters.forEach(element => {
                //         if (guess.letterGuess === element) {
                //             console.log("Letter has been guessed already. Please enter a different letter.")
                //             startGame();
                //         } else {
                //             noDuplicate(guess.letterGuess);
                //         }
                //     });
                // } else {
                // *** NEEDS FIX ***
                noDuplicate(guess.letterGuess);
            }

            // } PART OF FIX *** ***
        })
    } else if (maxGuesses <= 0) {
        console.log("Sorry, you ran out of guess attempts. :(")
        endGame();
    }
}

let noDuplicate = function (guess) {
    guessedLetters.push(guess)
    wordToGuess.checkGuessedLetter(guess.toUpperCase());
    displayWord();
    maxGuesses--;
    console.log("Number of guesses remaining: " + maxGuesses)
    startGame();
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
