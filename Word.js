var Letter = require("./Letter");

var Word = function (word) {
    var wholeWord = [];
    // console.log(word.length)
    // console.log(word)
    for (let i = 0; i < word.length; i++) {
        const element = word[i];
        var newLetter = new Letter (element, false)
        wholeWord.push(newLetter)
    }
    // console.log(wholeWord)
    // console.log(newLetter)
    this.theString = function () {
        var createString = [];
        for (let i = 0; i < wholeWord.length; i++) {
            const element = wholeWord[i].displayed();
            // console.log(element)
            createString.push(element);
        }
        var displayedString = createString.join(" ")
        console.log(displayedString)
    }
    this.checkGuessedLetter = function (letter) {
        wholeWord.forEach(element => {
            element.checkGuess(letter)
        });
    }
}

module.exports = Word;

// var testWord = new Word("TESTING")

// testWord.theString();

// testWord.checkGuessedLetter("S")

// testWord.theString();

// testWord.checkGuessedLetter("T");

// testWord.theString();

// testWord.checkGuessedLetter("E");

// testWord.theString();

// testWord.checkGuessedLetter("I");

// testWord.theString();

// testWord.checkGuessedLetter("N");

// testWord.theString();

// testWord.checkGuessedLetter("G");

// testWord.theString();

