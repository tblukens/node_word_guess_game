// create Letter constructor
var Letter = function(letter, guessed){
    this.letter = letter;
    this.guessed = guessed;
    // function to display letters. if guessed is true the letter is shown, otherwise underscore shows
    this.displayed = function() {
        // this is to get rid of spaces in words... cheesy
        if (this.letter === " "){
            this.guessed = true;
        }
        if (this.guessed === true) {
            // returns letter so it can be displayed
            return this.letter;
        } else if (this.guessed === false) {
            //show underscore
            return "_";
        }
        
    }
    // checks guess against letter
    this.checkGuess = function(guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    }
}


// -- LETTER.JS TESTING COMMANDS -- //
// var a = new Letter ("a", false);

// a.displayed();

// a.checkGuess("a")


// export letter function
module.exports = Letter;