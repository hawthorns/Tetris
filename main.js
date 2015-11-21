var workBoard = null;

function keydownCallback(e) {
    switch(e.keyCode) {
        case 37: // <-
        case 65: // a
            workBoard.moveLeft();
            break;
        case 39: // ->
        case 68: // d
            workBoard.moveRight();
            break;
        case 40: // down
        case 83: // s
            workBoard.moveDown();
            break;
        case 38: // up 
        case 87: // w
            workBoard.rotateRight();
            break;
        case 32: // space
            if (workBoard.gamePaused) {
                workBoard.gamePaused = false;
            } else {
                workBoard.gamePaused = true;
            }
            break;
		default:
			return;
    }
	e.preventDefault();
}

function keyupCallback(e) {
    switch(e.keyCode) {
        case 37: // <-
        case 65: // a
            workBoard.movingLeft = false;
            break;
        case 39: // ->
        case 68: // d
            workBoard.movingRight = false;
            break;
        case 40: // down
        case 83: // s
            workBoard.movingDown = false;
            break;
		default:
			return;
    }
	e.preventDefault();
}

var startX = 0;
var startY = 0;
function touchStart(e) {
	e.preventDefault();
    startX = e.targetTouches[0].pageX,
    startY = e.targetTouches[0].pageY;
}

function touchMove(e) {
	e.preventDefault();
    var curX = event.targetTouches[0].pageX - startX;
    var curY = event.targetTouches[0].pageY - startY;
    if ( Math.abs(curX) > Math.abs(curY) && curX > 0 ) {
        workBoard.moveRight();
		workBoard.movingRight = false;
    }
    else if ( Math.abs(curX) > Math.abs(curY) && curX < 0 ) {
        workBoard.moveLeft();
		workBoard.movingLeft = false;
    }
    else if ( Math.abs(curY) > Math.abs(curX) && curY > 0) {
        workBoard.moveDown();
		workBoard.movingDown = false;
    }
    else if ( Math.abs(curY) > Math.abs(curX) && curY < 0 ) {
        workBoard.rotateRight();
    }
    else{
        //alert("just touch");
    }
}

function main() {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");

    document.addEventListener("keydown", keydownCallback, false);
	document.addEventListener("keyup", keyupCallback, false);
    myCanvas.addEventListener("touchstart", touchStart, false);
    myCanvas.addEventListener("touchmove", touchMove, false);
    var myBoard = new board(10, 20, ctx);
    workBoard = myBoard;
    myBoard.init();
    myBoard.runGame();
}
