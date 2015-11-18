
function scene(spiritNum, girdMap) {
  if (spiritNum > 6) {
    spiritNum = 6;
  }
  this.spiritNum = spiritNum;
  this.girdMap = girdMap;
  this.girdWidth = girdMap.length;
  this.girdHeight = girdMap[0].length;
  this.spiritImgs = ["StaticItem01", "StaticItem02", "StaticItem03", "StaticItem04", "StaticItem05", "StaticItem06"];
  this.invalidType = this.spiritImgs.length;
  this.score = 0;
}

scene.prototype.draw = function(graphics, image) {
	for (var i = 0; i < this.girdWidth;  i++) {
		for (var j = 0; j < this.girdHeight; j++) {
			var ranImgNum = Math.floor(Math.random()*this.spiritNum);
      var dx = i * spiritWidth;
      var dy = j * spiritWidth;
      var spiritImg = this.spiritImgs[ranImgNum];
      var x = spiritMap[spiritImg][0][0];
      var y = spiritMap[spiritImg][0][1];
      var width = spiritMap[spiritImg][1][0];
      var height = spiritMap[spiritImg][1][1];
      this.girdMap[i][j] = ranImgNum;
	    graphics.drawImage(image, x, y, width, height, dx, dy, spiritWidth, spiritWidth);
		}
	}
}

scene.prototype.isInMap = function(x, y) {
  if ((x >= 0) && (x < this.girdWidth) && (y >= 0) && (y < this.girdHeight)) {
    return true;
  }
  return false;
}

scene.prototype.isNeighbor = function(sx, sy, dx, dy) {
  if (!this.isInMap(sx, sy) || !this.isInMap(dx, dy)) {
    return false;
  }
  if((sx == dx) && (sy + 1 == dy)) {
    return true;
  }

  if((sx == dx) && (sy - 1 == dy)) {
    return true;
  }

  if((sy == dy) && (sx + 1 == dx)) {
    return true;
  }

  if((sy == dy) && (sx - 1 == dx)) {
    return true;
  }
  return false;
}


scene.prototype.isCompleteLine = function(girdLine) {
    var spiritType = this.invalidType;
    var spiritLineLength = 0;
    var hasCompileLine = false;
	  for (var k = 0; k < girdLine.length;  k++) {
      if (spiritType == girdLine[k]) {
        spiritLineLength ++;
      } else {
        if (spiritLineLength >= 3) {
          var i = k - 1;
          while (spiritLineLength >= 0) {
            girdLine[i] = this.invalidType;
            i --;
            spiritLineLength--;
          }
          hasCompileLine = true;
        }
        spiritLineLength = 0;
      }
      spiritType = girdLine[k];
    }
    return hasCompileLine;
}

scene.prototype.removeCompleteSpirit = function() {
	for (var x = 0; x < this.girdWidth;  x++) {
    if (this.isCompleteLine(this.girdMap[x])) {
       
    }
  }
  return false;
}
