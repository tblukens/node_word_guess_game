// require inquirer to prompting user for letter
const inquirer = require("inquirer");

// importing Word to use Word function
const Word = require("./Word");

// is-letter is a node package to check if something is a single letter
const isLetter = require("is-letter");

//  using chalk for command line styling
const chalk = require('chalk');
// changing console.log to just log for 'time saving'
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

// newGame to change whats displayed with a new word
let newGame = true;

// wordGuessed for if statement letting game end
let wordGuessed = false;

// setting maxGuesses at 10. May be too easy?
let maxGuesses = 10;

// variable to store a random word
let randomWord;

// variable to store the Word object
let wordToGuess;

// array to store guessed letters
let guessedLetters = [];

// startGame is the main game function
let startGame = function () {
    // first run lettersRemaining function to check if word has been fully revealed
    lettersRemaining();
    // if users hasnt used all maxGuess and the word has not been guessed show their guessed letters
    if (maxGuesses > 0 && wordGuessed === false) {
        if (guessedLetters.length > 0) {
            console.log("\nGuessed Letters: " + chalk.green(" " + guessedLetters.join(",")+" \n"))
        }
        // if the game is fresh then display word starting out
        if (newGame === true) {
            newGame = false;
            displayWord();
        }
        // here is our inquirer prompt to request user to enter a letter
        inquirer.prompt([
            {
                name: "letterGuess",
                message: chalk.blue.inverse("Guess a letter: "),
            }
            // then function runs checking the guessed letter
        ]).then(function (guess) {
            // this is 'is-letter' checking if input is a single letter
            if (!isLetter(guess.letterGuess)) {
                // if its not a single letter then will use recursion to go back and ask for letter input again
                log(chalk.red("\nPlease enter a single letter...\n"));
                startGame();
            } else {
                // otherwise it checks the guess against guessedLetters array
                // and runs noDuplicate function if letter has not been guessed already
                if (guessedLetters.indexOf(guess.letterGuess.toUpperCase()) === -1) {
                    noDuplicate(guess.letterGuess.toUpperCase());
                } else {
                    // else this runs if letter has been guessed
                    console.log(chalk.red("\nLetter has been guessed already. Please give a different letter.\n"));
                    startGame();
                }
            }
        })
        // if user has run out of guess attempts
    } else if (maxGuesses <= 0) {
        console.log(chalk.red.inverse("\n Sorry, you ran out of guess attempts. :( \n"))
        endGame();
    }
}
// noDuplicate function is where the guessed letters are pushed to array and starts user back at main game function
let noDuplicate = function (guess) {
    // if the letter is included in the word
    if (wordToGuess.word.indexOf(guess) === -1){
        // if not a correct letter it will subtract a guess attempt
        subtractGuessTotal();
    }
    // push the letter to guessed letters
    guessedLetters.push(guess)
    // use the check guess function create in Word to check the letter
    wordToGuess.checkGuessedLetter(guess);
    //display the word
    displayWord();
    // show number of guesses remaining
    console.log(chalk.yellow.inverse("\nNumber of guesses remaining: " + maxGuesses + " "))
    // then take user back to main game function
    startGame();
}
// function to subtract from guess attempts and let user know incorrect letter guess
let subtractGuessTotal = function () {
    let repeater = 43;
    log(chalk.red.inverse("\n"+"¯".repeat(repeater)+"\n Sorry, that was not one of the letters... \n"+"_".repeat(repeater)+"\n"))
    maxGuesses--;
}

// letters remaining function
let lettersRemaining = function () {
    // store word length into a variable
    let remaining = wordToGuess.wholeWord.length;
    // loop through word to get number of letters left to guess
    for (let i = 0; i < wordToGuess.wholeWord.length; i++) {
        // checks if the guessed variable inside Letter object of Word is true or false
        const element = wordToGuess.wholeWord[i].guessed;
        if (element === true) {
            remaining--;
        } else {

        }
    }
    // if word is fully completed this runs and shows user wins
    if (remaining === 0) {
        wordGuessed = true;
        console.log(chalk.cyan.inverse("\n"+"¯".repeat(10)+"\n You win! \n"+"_".repeat(10)+"\n"));
        endGame();
        return false;
    }
    // store remaining variable into letters remaining global variable
    numberOfLtrsRemaining = remaining;
}

// function to display the word using Word function
let displayWord = function () {
    wordToGuess.theString();
    console.log("\n")
}

// endGame function to ask the user if they would like to play again
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

// this resets the game back to base values for all the variables
let resetGame = function () {
    guessedLetters = [];
    wordGuessed = false;
    newGame = true;
    // creates a new random word
    randomWord = listOfWords[Math.floor(listOfWords.length * Math.random())].toUpperCase();
    // checks if wordToGuess is undefined... if it is then that means its a brand new never been played game
    if (wordToGuess !== undefined) {
        // this checks if the randomWord is equal to the previous games word
        if (randomWord === wordToGuess.word) {
            // if it is the same word it will run resetGame again to get a new word
            resetGame();
        }
        else {
            // otherwise it will load the game and push the new random word into wordtoguess variable
            loadWordAndStart();
        }
    } else {
        // this runs if its a completely brand new game. fresh start. loads the random word into loadwordandstart
        loadWordAndStart();
    }


}
// gets the word from random word then constructs using Word function
let loadWordAndStart = function () {
    wordToGuess = new Word(randomWord);
    // logs word for testing ONLY
    //  _____________________________________________
    // console.log(randomWord)
    // ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    
    lettersRemaining();

    // this loads at the beginning of a new game
    console.log(chalk.yellow.inverse("\n Number of guesses: " + maxGuesses+" \n"))
    startGame();
}

// welcome message
const welcome = " Welcome to Word Guess: Video Games!!! "
// logging welcome message
log(chalk.bold.bgCyan("\n\n"+"¯".repeat(welcome.length)+"\n"+welcome+"\n"+"_".repeat(welcome.length)))

// makes sure new game starts up right away
// makes random word... etc...
resetGame();