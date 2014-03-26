$(function () {
  var game = new Game();
  game.start();
  
  $('html').keydown(function(event) {
    switch (event.keyCode) {
    case 38:
      game.updateDirection("north");
      break;
    case 39:
      game.updateDirection("east");
      break;
    case 40:
      game.updateDirection("south");
      break;
    case 37:
      game.updateDirection("west");
      break;
    case 32:
      game.pauseGame();
      break;
    case 82:
      location.reload();
      break;
    }
    
  });
  
});

