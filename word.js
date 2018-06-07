// require letter.js to bring inside method for Word constructor
var Letter = require("./letter.js");
function Word(word) {
	this.word = word;
	this.letters = [];
	this.guessedLetters = [];
	this.wrong = 0;
	for (var i = 0; i < this.word.length; i++) {
		this.letters.push(new Letter(this.word[i]));
	}
}
// Checks 'showLetter' variable to render wether letter or blank space
Word.prototype.toDisplay = function() {
	var string = "";
	for (var i = 0; i < this.letters.length; i++) {
		string += this.letters[i].render();
	}
	return string;
}
// Checks letters array for match & records guess
Word.prototype.searchLetter = function(letter) {
	if (this.guessedLetters.indexOf(letter) > -1) {
		console.log("Common Challenger?!, you've already guessed '" + letter + "'!");
		return;
	}
	// Records the guess
	this.guessedLetters.push(letter);
	// If letter guessed is right, change 'showLetter' to true so it renders letter
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].letter === letter) {
			this.letters[i].showLetter = true;
		}
	}
	// Checks if the letter guessed is in word&if not, records in the wrong guess
	if (this.word.indexOf(letter) > -1) {
		var letterIndex = this.word.indexOf(letter);
		if (!this.letters[letterIndex].showLetter) {
			return;
		}
		console.log("CORRECT! ...On the money! ...Good Job ...Let's Go!");
	} else {
		this.wrong++;
		console.log("INCORRECT! ...WRONG!, ...Off target ...But you can do it! ...Let's Go!");
		return;
	}
}
// Checks to see if the entire word has been guessed correctly
Word.prototype.isWordComplete = function() {
	for (var i = 0; i < this.letters.length; i++) {
		if (!this.letters[i].showLetter) {
			return false;
		}
	}

	return true;
}
module.exports = Word;