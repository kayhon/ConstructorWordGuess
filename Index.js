var Word = require("./word.js");
var Letter = require("./letter.js");
var inquirer = require("inquirer");
// weapon Word bank w/index choosing random word from  this list
var wordChoices = ["BAZOOKA", "BOMB", "CROSSBOW", "GRENADE", "MACHETE", "MISSLE", "NUMCHUCKS", "PISTOL", "RIFLE", "SHOTGUN", "SWORD", "TORPEDO", "UZI"];
var wordIndex = Math.floor(Math.random() * wordChoices.length);
var newWord = new Word(wordChoices[wordIndex]);
var maxGuesses = 7;
function playWeaponHangman(){
	// Displays the word that you guess of string of blanks & letters
	console.log(newWord.toDisplay() + "\n");
	// Game ends (loss) if no more guesses remain
	if (newWord.wrong >= maxGuesses){
		console.log("Sorry Challenger, no more guesses left! ..here's a tissue");
	// Challenger can end the game or they can get another set of guesses & another try @ the word
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "Do you want to end the game scaredy cat?"
			}
		]).then(function(response) {

			if (response.confirm) {
				console.log("You died =( ..Thanks for playing! Better luck next time...");
				return;
			} else {
				console.log("\nWant to try it again, Aye? Alrighty then, here you go!");
				newWord.wrong = 0;
				playWeaponHangman();
			} 
		})
		return; 
	}
	// Prompt to guess letter with input validation
	inquirer.prompt([
		{
			name: "letter",
			type: "input",
			message: "Challenger: Guess a letter! (Theme: WEAPONS) ",
			validate: function validateGuess(letter){
	        	if (letter.length > 1) {
	        		console.log("? What's that?! Enter just one letter..\n");
	        		return;
	        	} else if (!letter.match(/^[a-zA-Z]*$/)) {
	        		console.log("? That's not a letter genius! Try again..\n");
	        		return;
	        	} else {
	        		return true;
	        	}
			}
		}
	]).then(function(letterInput){ 
		// Changes input to capital letter
		var letter = letterInput.letter.toUpperCase(); 
		// Check for input letter in word and change display
		newWord.searchLetter(letter);
		newWord.toDisplay();
		// If the entire word is completed and guesses remain, game ends  (win)
		if(newWord.isWordComplete()){ 
			console.log("\n   *  *  *   ̿’̿’\̵͇̿̿\з== [•̪●] ==ε/̵͇̿̿/’̿’̿ ̿ ̿̿   ' ' ' ' ' '    ")
			console.log("You got it! wooha! high 5! The word was '" + newWord.toDisplay() + "'. Let's play again!\n");
			wordIndex = Math.floor(Math.random() * wordChoices.length);
			nextWord = new Word(wordChoices[wordIndex]);
			newWord = nextWord;
		}
		// If the word isnt completed&guesses remain, prompt to guess again
		console.log("You have " + (maxGuesses - newWord.wrong) + " guesses remaining...\n");
		playWeaponHangman();

		}
  );
}
// Starts game
playWeaponHangman();