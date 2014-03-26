function Snake(arr, dir) {
  this.arr = arr;
  this.dir = dir;
  
}

Snake.prototype.turn = function(direction) {
  this.dir = direction;

  var head = this.arr[0];
  
  switch (direction)
  {
  case "west": // 38 left
    this.arr.unshift([head[0], head[1]-1]);
    break;
  case "south": // 39 down
    this.arr.unshift([head[0]+1, head[1]]);
    break;
  case "east": // 40 right
    this.arr.unshift([head[0], head[1]+1]);
    break;
  case "north": // 37 up
    this.arr.unshift([head[0]-1, head[1]]);
    break;
  }
  
}

Snake.prototype.step = function() {
  this.turn(this.dir);
  
}

Snake.prototype.update = function() {
  if (arguments.length > 0) {
    this.turn(arguments[0]);
  } else {
    this.step();
  }
  

}

Snake.prototype.selfCollision = function() {
  var head = this.arr[0];
  var compareArr = this.arr.slice(1);
  var collided = false;
  compareArr.forEach(function(el){
    if (el[0] === head[0] && el[1] === head[1]) {
      collided = true;
    }
  });
  return collided;
}

Snake.prototype.wallCollision = function() {
  var head = this.arr[0];
  if (head[0]> 19 || head[0] < 0 || head[1] > 19 || head[1] < 0) {
    return true;
  }
  return false;

}

var Game = function() {}

Game.prototype.start = function() {
  that = this;
  this.paused = false;
  this.score = 0;
  var snake = new Snake([[10,10],[11,10],[12,10]], "north");
  this.snake = snake;
  this.updateDirection(this.snake.dir);
  this.apple = that.randomApple();
  this.session = this.gameLoop();
  
  
}

Game.prototype.gameLoop = function() {
  that = this;
  var win = window.setInterval(function(){ 
    that.snake.update(that.snake.updateDir);
    
    if (that.eatApple() === false) {
      that.snake.arr.pop();
    }
    
    if (that.snake.selfCollision() || that.snake.wallCollision()) {
    
      $('#scoreboard').append('<div id="overMessage"><h1>GAME OVER!</h1></div>');
      clearInterval(win);
    
    } else {
      that.render();
    }
  
  }, 100);
  return win;
}

Game.prototype.eatApple = function() {
  var head = this.snake.arr[0];
  var eaten = false;
  if (head[0] === this.apple[0] && head[1] === this.apple[1]) {
    eaten = true;
  } 
  return eaten;
  
}

Game.prototype.randomApple = function() {

  do {
    var conflicts = false;
    randomSpot = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
    this.snake.arr.forEach(function(coord) {
      if (coord[0] === randomSpot[0] && coord[1] === randomSpot[1]) {
        conflicts = true;
      }
      
    });
    
  } while (conflicts === true);
  return randomSpot;
}

Game.prototype.updateDirection = function(dir) {
  var prevDir = this.snake.dir;
  var opposites = {"north": "south", "south": "north", "east": "west", "west": "east"};
  if (dir != opposites[prevDir]) {
    this.snake.updateDir = dir;
  }
  
}

Game.prototype.pauseGame = function() {
  if (this.paused === false) {
    this.paused = true;
    clearInterval(this.session);
    this.session = undefined;
    
  } else if (this.paused === true) {
    this.paused = false;
    this.session = this.gameLoop();
  }
  
}

Game.prototype.render = function() {

  var appleId = "#\\[" + this.apple[0] + "\\," + this.apple[1] + "\\]";
  $(appleId).addClass('appleColor');
  
  $('div').filter('.snakeColor').toggleClass('snakeColor');
  this.snake.arr.forEach(function(coord) {
    var id = "#\\[" + coord[0] + "\\," + coord[1] + "\\]";
    $(id).toggleClass('snakeColor');
  });
  
  if (this.eatApple() === true) {
    this.score++;
    $('#scoreboard').html('apples eaten: ' + this.score);
    $(appleId).removeClass('appleColor');
    this.apple = this.randomApple();
  }
  
  
}