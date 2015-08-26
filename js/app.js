
var enemySpeeds = [];
for (var i = 150; i < 600; i+=100) {
    enemySpeeds.push(i);
};
var enemyLanes = [55, 140, 220];

// Enemies our player must avoid
var Enemy = function(lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    this.y = lane;
    this.speed = enemySpeeds[Math.floor(Math.random() *
        enemySpeeds.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
    }
    //TODO: update the speed.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.startingPos();
};

Player.prototype.startingPos = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function() {

    // Store player and enemy dimensions
    var width = 83,
        height = 171,
        // add top to player/enemy y coordinate
        top = 95;   

    //Detect player's collision with enemies
    for (var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + width &&
            this.x + width > allEnemies[i].x &&
            this.y + top < allEnemies[i].y + height &&
            height + this.y > allEnemies[i].y + top) {
                //Reset player to starting position
                player.reset();
        };
    };

    //If player reaches water, return to starting position 
    if (this.y == -20) {
        player.reset();
    };
    
};

// Return player to starting position after 100 ms
Player.prototype.reset = function() {
    setTimeout(function() {
        player.startingPos();
    }, 100);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            if (this.y > -20) {
                this.y -= 80;
            };
            break;
        case 'down':
            if (this.y < 380) {
                this.y += 80;
            };
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            };
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy;
for (var i=0; i < 3; i++) {
    allEnemies.push(
        enemy = new Enemy( enemyLanes[i] ) 
    );
};
// Place the player object in a variable called player
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
