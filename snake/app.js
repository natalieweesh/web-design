$(function () {
  
  $('body').prepend('<p>press R to start new game</p>');
  $('body').prepend('<p>press spacebar to pause</p>');
  $('body').append('<table id="t1">');
  for (var i = 0; i < 20; i++ )
  {
    $('#t1').append('<tr id="r'+ i + '">');
      for (var j=0; j < 20; j++) {
        var row = "#r" + i;
        $(row).append('<td><div id="[' +i + "," + j + ']"></div></td>');
      }
  }
  

  $('body').append('<p id="scoreboard">apples eaten: 0</p>');
});