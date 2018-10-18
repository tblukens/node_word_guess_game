const chalk = require("chalk")
// create Letter constructor
var Letter = function(letter, guessed){
    this.letter = letter;
    this.guessed = guessed;
    this.displayed = function() {
        if (this.letter === " "){
            this.guessed = true;
        }
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
            const repeater = 28;
            return console.log(chalk.green.inverse("\n"+"¯".repeat(repeater)+"\n Correct! The letter was: " + chalk.underline(this.letter)+" \n"+"_".repeat(repeater)+"\n"))
        }
    }
}

// var a = new Letter ("a", false);

// a.displayed();

// a.checkGuess("a")

module.exports = Letter;