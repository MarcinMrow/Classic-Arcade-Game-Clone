// restart button
let restartBtn = document.querySelector(".restart");

// access the class
let count = document.querySelector(".points");

// access the congratulation popup/ succes box
let successBox = document.getElementById("myModal");

// add stats board to the canvas
let statsBoard = document.createElement("h1");
document.body.appendChild(statsBoard);

/*
// add stats board to the canvas
let statsBoardScore = document.createElement("h1");
document.body.appendChild(statsBoardScore);

// add stats board to the canvas
let statsBoardLives = document.createElement("h1");
document.body.appendChild(statsBoardLives);
*/

// game description popup
function myFunction() {
	alert('This is ARCADE GAME. You want to get to the water without colliding into any of the Bugs! GOOD LUCK!')
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
	
	//
	this.x += this.speed * dt;
	
	if (this.x > 510) {
		this.x = -50;
		this.speed = 100 + Math.floor(Math.random() * 200);
	}
	
	if (player.x < this.x + 80 && 
		player.x + 80 > this.x && 
		player.y < this.y + 60 && 
		60 + player.y > this.y) {
		player.x = 202;
		player.y = 405;
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

var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.player = 'images/char-boy.png';
	// this.lives = 4;
}

// 
Player.prototype.update = function(dt) {
	statsBoard.innerHTML = `Score: ${score} ___________________ Lives: ${lives}`;
	// statsBoardScore.innerHTML = `Score: ${score}`;
	// statsBoardLives.innerHTML = `Lives: ${lives}`;
}

//
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

//
Player.prototype.reset = function() {
	this.x = 202;
	this.y = 405;
}



/*
//entitites collision detection/ player's life reduction/ end of the game
function collisionDetection() {
	var collision = checkCollisions(allEnemies);
	if (this.collision) {
		if (lives !== 0) {
			--lives;
			update();
        }
	}
}
*/		

/*
// create and update the score display
function drawScore() {
	ctx.font = "30px Helvetica";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: "+score, 8, 20);
}
*/

//
Player.prototype.handleInput = function(keyPress) {
	if (keyPress == 'left' && this.x > 0) {
		this.x -= 102;
	}
	if (keyPress == 'right' && this.x < 405) {
		this.x += 102;
	}
	if (keyPress == 'up' && this.y > 0) {
		this.y -= 83;
	}
	if (keyPress == 'down' && this.y < 405) {
		this.y += 83;
	}
	if (this.y < 0) {
		setTimeout(function() {
			player.x = 202;
			player.y = 405;
			score++;
		}, 100);
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyPosition = [63, 147, 230];

// check collisions
var checkCollisions = function() {
	for (let i = 0; i < allEnemies.length; i++) {
		if ((allEnemies[i].x < player.x + 40) &&
		(player.x < allEnemies[i].x + 60) &&
		(allEnemies[i].y < player.y + 60) &&
		(player.y < allEnemies[i].y + 40)) {
			--lives;
			if (lives === 0) {
			gameRestart();
			} 
		}
	}
};

enemyPosition.forEach(function(positionY) {
	enemy = new Enemy(0, positionY, 200);
	allEnemies.push(enemy);
});

let player = new Player(202, 405);

// restart game
function gameRestart() {
	player.reset();
	lives = 4;
	score = 0;
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


