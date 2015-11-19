var FPS = 25;
var workBoard = null;

function moveBox() {
  
}

function main() {
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");

	myCanvas.addEventListener("keydown", moveBox, false);
  var myBoard = new board(10, 20, ctx);
  myBoard.init();
  workBoard = myBoard;
	// setInterval("loop()", 1000/FPS);
  loop();
}

function loop() {
  workBoard.runGame();
}
