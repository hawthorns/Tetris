var BLANK = 46 // '.';
var BOX_SIZE = 20;
var BOARD_MARGIN = 80;
var TEMPLATE_WIDTH = 5
var TEMPLATE_HEIGHT = 5
var interval = 1000;

function board(boardWidth, boardHeight, ctx) {
  this.boardWidth = boardWidth;
  this.boardHeight = boardHeight;
  this.graphics = ctx;
  this.score = 0;
  this.clolorMap = ["white", "rgb(185, 185, 185)", "red", 
        "rgb(175,  20,  20)", "green", "rgb( 20, 175,  20)",
        "rgb( 20,  20, 175)", "yellow", "rgb(175, 175,  20)"];
  this.fallingSpirit = null;
  this.boardMap = null;
  this.movingLeft = false;
  this.movingRight = false;
  this.movingDown = false;
  this.gamePaused = false;
  this.gameOver = false;
}

board.prototype.init = function() {
    var boardMap = new Array();
    for (var x = 0; x < this.boardWidth;  x++) {
        boardMap[x] = new Array();
        for (var y = 0; y < this.boardHeight; y++) {
            boardMap[x][y] = BLANK;
        }
    }
  this.boardMap = boardMap;
  var S_SPIRIT_TEMPLATE =
  [['.....',
    '.....',
    '..OO.',
    '.OO..',
  '.....'],
  ['.....',
    '..O..',
    '..OO.',
    '...O.',
  '.....']]

  var Z_SPIRIT_TEMPLATE =
  [['.....',
    '.....',
    '.OO..',
    '..OO.',
  '.....'],
  ['.....',
    '..O..',
    '.OO..',
    '.O...',
  '.....']]

  var I_SPIRIT_TEMPLATE =
  [['..O..',
    '..O..',
    '..O..',
    '..O..',
  '.....'],
  ['.....',
    '.....',
    'OOOO.',
    '.....',
  '.....']]

  var O_SPIRIT_TEMPLATE =
  [['.....',
    '.....',
    '.OO..',
    '.OO..',
  '.....']]

  var J_SPIRIT_TEMPLATE =
  [['.....',
    '.O...',
    '.OOO.',
    '.....',
  '.....'],
  ['.....',
    '..OO.',
    '..O..',
    '..O..',
  '.....'],
  ['.....',
    '.....',
    '.OOO.',
    '...O.',
  '.....'],
  ['.....',
    '..O..',
    '..O..',
    '.OO..',
  '.....']]

  var L_SPIRIT_TEMPLATE =
  [['.....',
    '...O.',
    '.OOO.',
    '.....',
  '.....'],
  ['.....',
    '..O..',
    '..O..',
    '..OO.',
  '.....'],
  ['.....',
    '.....',
    '.OOO.',
    '.O...',
  '.....'],
  ['.....',
    '.OO..',
    '..O..',
    '..O..',
  '.....']]

  var T_SPIRIT_TEMPLATE =
  [['.....',
    '..O..',
    '.OOO.',
    '.....',
  '.....'],
  ['.....',
    '..O..',
    '..OO.',
    '..O..',
  '.....'],
  ['.....',
    '.....',
    '.OOO.',
    '..O..',
  '.....'],
  ['.....',
    '..O..',
    '.OO..',
    '..O..',
  '.....']]

  var SPIRITS = [
    S_SPIRIT_TEMPLATE,
    Z_SPIRIT_TEMPLATE,
    J_SPIRIT_TEMPLATE,
    L_SPIRIT_TEMPLATE,
    I_SPIRIT_TEMPLATE,
    O_SPIRIT_TEMPLATE,
    T_SPIRIT_TEMPLATE
  ];
  this.SPIRITS = SPIRITS;
}


board.prototype.drawBoard = function() {
    for (var x = 0; x < this.boardWidth;  x++) {
        for (var y = 0; y < this.boardHeight; y++) {
            var color = this.boardMap[x][y];
            if(color != BLANK) {
                this.graphics.fillStyle = this.clolorMap[color];
                this.graphics.fillRect(BOARD_MARGIN+x*BOX_SIZE, BOARD_MARGIN+y*BOX_SIZE, BOX_SIZE, BOX_SIZE);
            }
        }
    }
}

board.prototype.drawBoardLine = function() {
    this.graphics.strokeStyle = "rgb(0, 0, 155)";
    this.graphics.beginPath();
    for (var x = 0; x <= this.boardHeight;  x++) {
        this.graphics.moveTo(BOARD_MARGIN, x*BOX_SIZE+BOARD_MARGIN);
        this.graphics.lineTo(this.boardWidth*BOX_SIZE+BOARD_MARGIN, x*BOX_SIZE+BOARD_MARGIN);
    }

    for (var y = 0; y <= this.boardWidth; y++) {
        this.graphics.moveTo(y*BOX_SIZE+BOARD_MARGIN, BOARD_MARGIN);
        this.graphics.lineTo(y*BOX_SIZE+BOARD_MARGIN, this.boardHeight*BOX_SIZE+BOARD_MARGIN);
    }
    this.graphics.closePath();
    this.graphics.stroke();
}

board.prototype.drawSpirit = function(spirit) {
    var color = spirit.color;
    this.graphics.fillStyle = this.clolorMap[color];
    var px = BOARD_MARGIN + spirit.x*BOX_SIZE;
    var py = BOARD_MARGIN + spirit.y*BOX_SIZE;
    for (var x = 0; x < TEMPLATE_WIDTH;  x++) {
        for (var y = 0; y < TEMPLATE_HEIGHT;  y++) {
            if (this.SPIRITS[spirit.shape][spirit.rotation][y].charCodeAt(x) != BLANK) {
                this.graphics.fillRect(px+x*BOX_SIZE, py+y*BOX_SIZE, BOX_SIZE, BOX_SIZE);
            }
        }
    }
    var shadowAddY = 0;
    while(this.isValidPosition(spirit, 0, shadowAddY + 1)) {
        shadowAddY += 1;
    }
    py = py + shadowAddY*BOX_SIZE;
    this.graphics.strokeStyle = this.clolorMap[color];
    for (var x = 0; x < TEMPLATE_WIDTH;  x++) {
        for (var y = 0; y < TEMPLATE_HEIGHT;  y++) {
            if (this.SPIRITS[spirit.shape][spirit.rotation][y].charCodeAt(x) != BLANK) {
                this.graphics.strokeRect(px+x*BOX_SIZE, py+y*BOX_SIZE, BOX_SIZE, BOX_SIZE);
            }
        }
    }
}

board.prototype.clearScreen = function() {
    this.graphics.fillStyle = "#000000";
    this.graphics.fillRect(10, 10,
        (this.boardWidth+1)*BOX_SIZE+BOARD_MARGIN, (this.boardHeight+1)*BOX_SIZE+BOARD_MARGIN);
}


board.prototype.updateDisplay = function() {
    // window.requestAnimationFrame();
    this.clearScreen();
    this.drawBoard();
    if (this.fallingSpirit != null) {
        this.drawSpirit(this.fallingSpirit);
    }
    this.drawBoardLine();
}

board.prototype.gameLoop = function() {
    if (this.gamePaused || this.gameOver) {
        return false;
    }
    if (this.fallingSpirit == null) {
        this.fallingSpirit = this.newSpirit();
        if(!this.isValidPosition(this.fallingSpirit, 0, 0)) { // game over
            this.updateDisplay();
            this.gameOver = true;
            return true;
        }
    }

    if (this.movingLeft && this.isValidPosition(this.fallingSpirit, -1, 0)) {
        this.fallingSpirit.x -= 1;
    }
    if (this.movingRight && this.isValidPosition(this.fallingSpirit, 1, 0)) {
        this.fallingSpirit.x += 1;
    }
    if (this.movingDown && this.isValidPosition(this.fallingSpirit, 0, 1)) {
        this.fallingSpirit.y += 1;
    }

    if(!this.isValidPosition(this.fallingSpirit, 0, 1)) {
        this.addToBoard(this.fallingSpirit);
        this.score += this.removeCompleteLines();
        this.fallingSpirit = null;
    } else {
        this.fallingSpirit.y += 1;
    }

    this.updateDisplay();
    return false;
}

function loop() {
  if (workBoard.gameLoop()) {
    return;
  }
  window.setTimeout("loop()", interval);
}

board.prototype.runGame = function() {
  loop();
}

board.prototype.newSpirit = function() {
  var shape = Math.floor(Math.random()*this.SPIRITS.length);
  var spirit = {}
  spirit.shape = shape;
  spirit.rotation = Math.floor(Math.random()*this.SPIRITS[shape].length);
  spirit.x = Math.floor(this.boardWidth / 2) - Math.floor(TEMPLATE_WIDTH / 2);
  spirit.y = -5;
  spirit.color = Math.floor(Math.random()*this.clolorMap.length);
  return spirit;
}


board.prototype.isInMap = function(x, y) {
  if ((x >= 0) && (x < this.boardWidth) && (y >= 0) && (y < this.boardHeight)) {
    return true;
  }
  return false;
}

board.prototype.isValidPosition = function(spirit, addX, addY) {
    for (var x = 0; x < TEMPLATE_WIDTH;  x++) {
        for (var y = 0; y < TEMPLATE_HEIGHT;  y++) {
            if ((y + spirit.y + addY < 0) ||
                    (this.SPIRITS[spirit.shape][spirit.rotation][y].charCodeAt(x) == BLANK)) {
                continue;
            }
            if(!this.isInMap(x + spirit.x + addX, y + spirit.y + addY)) {
                return false;
            }
            if (this.boardMap[x + spirit.x + addX][y + spirit.y + addY] != BLANK) {
                return false;
            }
        }
    }
    return true;
}

board.prototype.moveLeft = function() {
 if(this.fallingSpirit == null){
        return;
  }
  if(this.isValidPosition(this.fallingSpirit, -1, 0)) {
        this.fallingSpirit.x -= 1;
        this.movingLeft = true;
        this.updateDisplay();
  }
}

board.prototype.moveRight = function() {
  if(this.fallingSpirit == null){
        return;
  }
  if(this.isValidPosition(this.fallingSpirit, 1, 0)) {
        this.fallingSpirit.x += 1;
        this.movingRight = true;
        this.updateDisplay();
  }
}

board.prototype.moveDown = function() {
    if(this.fallingSpirit == null){
        // crate a new one fast
        this.gameLoop();
        return;
    }
    if(this.isValidPosition(this.fallingSpirit, 0, 1)) {
        this.fallingSpirit.y += 1;
        this.movingDown = true;
        this.updateDisplay();
    }
}

board.prototype.rotateRight = function() {
    if(this.fallingSpirit == null){
        return;
    }
    var spiritLen = this.SPIRITS[this.fallingSpirit.shape].length;
    this.fallingSpirit.rotation = (this.fallingSpirit.rotation + 1) % spiritLen;
    if(!this.isValidPosition(this.fallingSpirit, 0, 0)) {
        this.fallingSpirit.rotation = (this.fallingSpirit.rotation - 1) % spiritLen;
    } else {
        this.updateDisplay();
    }
}

board.prototype.addToBoard = function(spirit) {
    for (var x = 0; x < TEMPLATE_WIDTH;  x++) {
        for (var y = 0; y < TEMPLATE_HEIGHT;  y++) {
            if (this.SPIRITS[spirit.shape][spirit.rotation][y].charCodeAt(x) != BLANK) {
                this.boardMap[x + spirit.x][y + spirit.y] = spirit.color;
            }
        }
    }
}


board.prototype.isCompleteLine = function(y) {
  for (var x = 0; x < this.boardWidth; x++) {
    if (this.boardMap[x][y] == BLANK) {
      return false;
    }
  }
  return true;
}

board.prototype.removeCompleteLines = function() {
    var numLinesRemoved = 0;
    var y = this.boardHeight - 1;
    while (y >= 0) {
        if (this.isCompleteLine(y)) {
            for(var pullDownY = y; pullDownY > 0; pullDownY--) {
                for (var x = 0; x < this.boardWidth; x++) {
                    this.boardMap[x][pullDownY] = this.boardMap[x][pullDownY-1];
                }
            }
            // set top line to BLANK
            for (var x = 0; x < this.boardWidth; x++) {
                this.boardMap[x][0] = BLANK;
            }
            numLinesRemoved += 1;
         } else {
            y -= 1;
         }
    }
    return numLinesRemoved;
}
