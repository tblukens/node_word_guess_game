var Letter = require("./Letter");

var Word = function (word) {
    this.word = word;
    this.wholeWord = [];
    
    for (let i = 0; i < word.length; i++) {
        const element = word[i];
        // console.log(element)
        var newLetter = new Letter (element, false)
        this.wholeWord.push(newLetter)
        
    }
    
    this.theString = function () {
        var createString = [];
        for (let i = 0; i < this.wholeWord.length; i++) {
            const element = this.wholeWord[i].displayed();
            
            createString.push(element);
        }
        var displayedString = createString.join(" ")
        console.log(displayedString)
    }
    this.checkGuessedLetter = function (letter) {
        this.wholeWord.forEach(element => {
            element.checkGuess(letter)
        });
    }

}

module.exports = Word;
