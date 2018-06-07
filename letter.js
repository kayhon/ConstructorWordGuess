function Letter(letter) {
	this.letter = letter;
	this.showLetter = false;
}
// Determines whether letter's been guessed to display or show blank
Letter.prototype.render = function() {
	if (this.showLetter) {
		return this.letter;
	} else {
		return "_ ";
	}
}
module.exports = Letter;