var girdNum = 10;
var map = new Array();

function main() {
	init();  
	// setInterval("loop()", 40);
	drawMap();
}

function init() {
	var myCanvas = document.getElementById("myCanvas");
	myCanvas.addEventListener("click", function(e) {
			//alert((e.clientX - myCanvas.offsetLeft) + "," + (e.clientY - myCanvas.offsetTop));
			}, false);
	parseXml("spirit.plist");
}

function drawMap() {
	var myCanvas = document.getElementById("myCanvas");
	var graphics = myCanvas.getContext("2d");

	var image = document.getElementById("spirit");
	graphics.drawImage(image, 271, 55,44,40,0,0,50,50);
	graphics.drawImage(image, 248, 0,44,40,50,50,50,50);

	//graphics.fillRect(10,10,15,15);

	for (var i = 0; i  < gridNum;  i++) {
		for (var i = 0; i  < gridNum;  i++) {
			Math.floor(Math.random()*10);
		}
	}
}
//function loop() {}
