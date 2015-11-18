var spiritWidth = 50; 
var selectSpiritX = 0;
var selectSpiritY = 0;
var currentScene = null;

function main() {
	init();  
	// setInterval("loop()", 40);
	drawMap();
}

function selectSpirit(e) {
  selectSpiritX = Math.floor((e.clientX - myCanvas.offsetLeft) / spiritWidth);
  selectSpiritY = Math.floor((e.clientY - myCanvas.offsetTop) / spiritWidth);
}

function moveSpirit(e) {
  var destX = Math.floor((e.clientX - myCanvas.offsetLeft) / spiritWidth);
  var destY = Math.floor((e.clientY - myCanvas.offsetTop) / spiritWidth);
  if (currentScene.isNeighbor(selectSpiritX, selectSpiritY, destX, destY)) { 
  } 
}

function init() {
	var myCanvas = document.getElementById("myCanvas");
	myCanvas.addEventListener("mousedown", selectSpirit, false);
	myCanvas.addEventListener("mouseup", moveSpirit, false);
}

function drawMap() {
	var myCanvas = document.getElementById("myCanvas");
	var graphics = myCanvas.getContext("2d");
	var image = document.getElementById("spirit");

  var spiritImgs = ["StaticItem01", "StaticItem02", "StaticItem03", "StaticItem04", "StaticItem05", "StaticItem06"];
  var girdMap = new Array();

  var girdNum = 5;
	for (var i = 0; i < girdNum;  i++) {
    girdMap[i] = new Array();
		for (var j = 0; j < girdNum; j++) {
      girdMap[i][j] = 0;
		}
	}
  var scene1 = new scene(4, girdMap);
  scene1.draw(graphics, image);
  currentScene = scene1;
}
