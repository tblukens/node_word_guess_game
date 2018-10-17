const chalk = require("chalk")
// create Letter constructor
var Letter = function(letter, guessed){
    this.letter = letter;
    this.guessed = guessed;
    this.displayed = function() {
        if (this.guessed === true) {
            // console.log(this.letter)
            return this.letter;
        } else if (this.guessed === false) {
            //show underscore
            return "_";
        }
    }
    this.checkGuess = function(guess) {
        if (guess === this.letter) {
            this.guessed = true;
            console.log(chalk.green("\nCorrect! The letter was: " + this.letter+"\n"))
        }
    }
}

// var a = new Letter ("a", false);

// a.displayed();

// a.checkGuess("a")

module.exports = Letter;