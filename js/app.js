/* These are two arrays containing that coordinates for each combination of
		row and column on the board */
var ROW_LOCATION = [44, 128, 212, 296, 380];
var COL_LOCATION = [0, 100, 200, 300, 400]

/**
  * @description Represents a enemy bug
  * @constructor
  * @param {integer} newStart - The x location of the enemy bug, in terms of pixels
  * @param {integer} newRow - The y location of the enemy bug, in terms of actual rows
  * @param {integer} newSpeed - The speed of the bug
  */
var Enemy = function(newSpeed, newRow, newStart) {
	
	// Set this.sprite to the path of the enemy image.
    this.sprite = 'images/enemy-bug.png';
	
	// Set this.x to newStart.
	this.x = this.getRandomInt(-400, -100);
	
	// Set this.y to newRow.
	this.y = this.getRandomInt(0, 3);
	
	// Set this.speed to newSpeed.
	this.speed = this.getRandomInt(50, 450);
};

/**
  * @description Updates the enemy bug to move across the screen
  * @param {number} dt - A constant parameter that ensures that the game runs at the same speed
							across different computers
  */
Enemy.prototype.update = function(dt) {
    
	/* Calculates the new x location according to the speed of the enemy bug
			and the parameter, dt. */
	this.x = this.x + (this.speed * dt);
	
	// If the bug moves off the screen,
	if (this.x > 605) {
		/* Reset the bug by bringing it back to the left of the canvas, changing its row,
				and changing its speed. */
		this.x = this.getRandomInt(-400, -100);
		this.y = this.getRandomInt(0, 3);
		this.speed = this.getRandomInt(100, 701);
	}
};

/** 
  * @description Draws the enemy object onto the canvas
  */
Enemy.prototype.render = function() {
	// Draw the enemy onto to the canvas.
    ctx.drawImage(Resources.get(this.sprite), this.x, ROW_LOCATION[this.y]);
};

/**
  * @description Returns a random integer between min (included) and max (excluded)
  * @returns An integer between min (included) and max (excluded)
  */
Enemy.prototype.getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

/** 
  * @description Represents a player character
  * @construtor
  */
var Player = function() {
	
	// Set this.sprite to the path of the player image.
	this.sprite = 'images/char-boy.png';
	
	// Set the x location of the player, in terms of actual columns.
	this.x = 2;
	
	// Set the y location of the player, in terms of actual rows.
	this.y = 4;
};

/** 
  * @description Updates the player if a collision occurs
  */
Player.prototype.update = function() {
	// For each enemy bug,
	for (var i = 0; i < allEnemies.length; i++) {
		// If there is a collision between the enemy bug and the player,
		if ((Math.abs(allEnemies[i].x - COL_LOCATION[this.x]) < 50) && ROW_LOCATION[allEnemies[i].y] === ROW_LOCATION[this.y]) {
			// Send the player back to the starting position.
			this.resetPlayer();
		}
	}
};

/**
  * @description Draws the player onto the canvas
  */
Player.prototype.render = function() {
	// Draw the player onto the canvas.
	ctx.drawImage(Resources.get(this.sprite), COL_LOCATION[this.x], ROW_LOCATION[this.y]);
};

/**
  * @description Moves the player in the appropriate direction, according to the passed
					in keyCode parameter
  * @param {string} keyCode - A string that holds the direction for the player to move to
  */
Player.prototype.handleInput = function(keyCode) {
	
	// Create a variable to hold the amount to move in the x direction.
	var moveX = 1;
	
	// Create a varaible to hold the amount to move in the y direction.
	var moveY = 1;
	
	// If the left arrow button was pressed,
	if (keyCode === 'left') {
		// If we are not at the left edge of the canvas,
		if (this.x - moveX > -1) {
			// Move the player one column to the left.
			this.x = (this.x - moveX);
		}
	}
	
	// If the up arrow button was pressed,
	if (keyCode === 'up') {
		// If we have reached the top of the board,
		if (this.y - moveY < 0) {
			// We have made it to the end! Reset the player to the starting position.
			this.resetPlayer();
		}
		
		// Else,
		else {
			// Move the player one row upwards.
			this.y = (this.y - moveY);
		}
	}
	
	// If the right arrow button was pressed,
	if (keyCode === 'right') {
		// If we are not at the right edge of the canvas,
		if (this.x + moveX < 5) {
			// Move the player one column to the right.
			this.x = (this.x + moveX);
		}
	}
	
	// If the down arrow button was pressed,
	if (keyCode === 'down') {
		// If we are not at the bottom edge of the canvas,
		if (this.y + moveY < 5) {
			// Move the player one row downwards.
			this.y = (this.y + moveY);
		}
	}
};

/**
  * @description Resets the player to the default starting position
  */
Player.prototype.resetPlayer = function() {
	
	// Set the column of the player to 2.
	this.x = 2;
	
	// Set the row of the player to 4.
	this.y = 4;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
	new Enemy(),
	new Enemy(),
	new Enemy(),
	new Enemy(),
	new Enemy()
];

var player = new Player();

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
