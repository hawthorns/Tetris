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
    }
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
    }
}

function main() {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");

    document.addEventListener("keydown", keydownCallback, false);
    document.addEventListener("keyup", keyupCallback, false);
    var myBoard = new board(10, 20, ctx);
    workBoard = myBoard;
    myBoard.init();
    myBoard.runGame();
}
