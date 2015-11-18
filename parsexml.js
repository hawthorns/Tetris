
function loadXMLDoc(url) {
	var xmlhttp = null;
	if (window.XMLHttpRequest){// code for IE7, Firefox, Mozilla, etc.
		xmlhttp = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {// code for IE5, IE6
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null) {
		//xmlhttp.onreadystatechange=onResponse;
		xmlhttp.open("GET",url,false);
		xmlhttp.send(null);
	} else {
		alert("Your browser does not support XMLHTTP.");
		return;
	}
	return xmlhttp.responseXML;
}

function parseDicts(xmlDoc, famesDict) {
	var famesChildDict = famesDict.childNodes;
	for (var i = 0; i < famesChildDict.length; i+=2) {
		//if (famesChildDict[i].nodeName == "key"){
		document.write(famesChildDict[i+1].firstChild.nodeValue + " ");
		//write(famesChildDict[i].firstChild.nodeName + " ");
		//}
		//var keyNodes = famesChildDict[i].firstChild.getElementsByTagName("key");
		//document.write(famesChildDict[i+1][1].firstChild.nodeName + "  ");
	}



	//for (var i = 0; i < keyNodes.length; i++) {
	//document.write(keyNodes[i].firstChild.nodeValue + "  ");
	//}
}

function parseXml(url) {
	var xmlDoc = loadXMLDoc(url);
	var rootDictNodes = xmlDoc.documentElement.getElementsByTagName("dict");
	famesDict = rootDictNodes[1];
	parseDicts(xmlDoc, famesDict);
}
