// require Letter.js so we can use the Letter function
var Letter = require("./Letter");

// create constructor for the Word
var Word = function (word) {

    this.word = word;
    // an array to hold Letter objects
    this.wholeWord = [];
    
    // for loop to create objects from letter function and push to wholeWord array
    for (let i = 0; i < word.length; i++) {
        const element = word[i];
        var newLetter = new Letter (element, false)
        this.wholeWord.push(newLetter)
    }
    // function to display either the letter, or underscore from Letter object
    this.theString = function () {
        // variable to store displayed letters in
        var createString = [];
        // loop to push letters to string display
        for (let i = 0; i < this.wholeWord.length; i++) {
            const element = this.wholeWord[i].displayed();
            
            createString.push(element);
        }
        // join the letters to create a display string
        var displayedString = createString.join(" ")
        console.log(displayedString)
    }
    // function to check letter 
    this.checkGuessedLetter = function (letter) {
        this.wholeWord.forEach(element => {
            element.checkGuess(letter)
        });
    }

}

// exporting Word to require in index.js
module.exports = Word;
