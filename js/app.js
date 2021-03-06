// Defines that JavaScript code is executed in "strict mode"
"use strict";

// access the congratulation popup/ succes box
let successBox = document.getElementById("myModal");

// add stats board to the canvas
let statsBoardScore = document.createElement("h1");
document.body.appendChild(statsBoardScore);

// add stats board to the canvas
let statsBoardLives = document.createElement("h1");
document.body.appendChild(statsBoardLives);

// stats for moves
let finalPoints = document.querySelector(".final-points");

// access the class
let count = document.querySelector("h1");

// game description popup
function myFunction() {
	alert('This is ARCADE GAME. You want to get to the water without colliding into any of the Bugs! GOOD LUCK!');
}

// define variables for points and lives
let score = 0;

// declare lives
let lives = 4;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
	// The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	this.x += this.speed * dt;
	
	if (this.x > 510) {
		this.x = -50;
		this.speed = 100 + Math.floor(Math.random() * 200);
	}
	
	if (player.x < this.x + 80 && 
		player.x + 80 > this.x && 
		player.y < this.y + 60 && 
		60 + player.y > this.y) {
		
		// player.x = 202;
		// player.y = 405;
		
		player.reset();
		lives--;
		if (lives === 0) {
			// alert("You lost");
			finishedGame();
			// gameRestart();
		}
	}
	
	/*
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));	
	}
	*/
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
	constructor(x, y, movement) {
		this.x = x;
		this.y = y;
		// this.movement = movement;
		this.player = 'images/char-boy.png';
		
	}
	
	// Update the player's position/ shows score & lives
	update(dt) {
		statsBoardScore.innerHTML = `Score: ${score}`;
		statsBoardLives.innerHTML = `Lives: ${lives}`;
	}
	
	// Draw the player on the screen
	render() {
		ctx.drawImage(Resources.get(this.player), this.x, this.y);
	}
	
	// Move the player back to the starting position
	reset() {
		let self = this;
		self.x = 202;
		self.y = 405;
	}
	
	// Move player with keyboard arrows
	handleInput(keyPress) {
		let self = this;
		if (keyPress == 'left' && self.x > 0) {
			self.x -= 102;
		}
		if (keyPress == 'right' && self.x < 405) {
			self.x += 102;
		}
		if (keyPress == 'up' && self.y > 0) {
			self.y -= 83;
		}
		if (keyPress == 'down' && self.y < 405) {
			self.y += 83;
		}
		if (self.y < 0) {
			setTimeout(function() {
				self.x = 202;
				self.y = 405;
				score++;
			}, 100);
		}	
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyPosition = [63, 147, 230];

enemyPosition.forEach(function(positionY) {
	let enemy = new Enemy(0, positionY, 200);
	allEnemies.push(enemy);
});

let player = new Player(202, 405);

// restart game
function gameRestart() {
	player.reset();
	lives = 4;
	score = 0;
}

// game over box is displayed when the game is finished
function finishedGame() {
	if (lives === 0) {
		finalPoints.innerHTML = count.innerHTML;
		successBox.classList.add("show");
		}
}

// click play-again button to play the game again
function playAgain() {
	successBox.classList.remove("show");
		gameRestart();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});