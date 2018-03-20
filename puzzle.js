function Pieces(piece, styleInfo, pos, posInfo) {
	this.piece = piece;
	this.styleInfo = styleInfo;
	this.pos = pos;
	this.posInfo = posInfo;
}
Pieces.prototype.setStyle = function() {
	this.piece.className = this.styleInfo + " " + this.posInfo;
}

var pieces = new Array();
function findPos(pos) {
	if (pos > 15 || pos < 0) return false;
	for (var i = 0; i < 16; i++) {
		if (pieces[i].pos == pos) return pieces[i];
	}
}
window.onload = function() {
	var gameArea = document.getElementById("gameArea");
	var restart = document.getElementById("restart");
	initial();
	for (var i = 0; i < 16; i++) {
		pieces[i].piece.onclick = (function(k) {
			return function() {
				move(k);
			};
		})(i);
	}
	restart.onclick = function() {
		for (var i = 0; i < 10000; i++) {
			var random = parseInt(Math.random() * 16);
			pieces[random].piece.click();
		}
	}
	function move(j) {
		if (pieces[j].styleInfo == "blank") return;
		var i = pieces[j].pos;
		if (i == 0) {
			if (moveRight(i) || moveDown(i)) return;
		}
		else if (i == 1 || i == 2) {
			if (moveLeft(i) || moveRight(i) || moveDown(i)) return;
		}
		else if (i == 3) {
			if (moveLeft(i) || moveDown(i)) return;
		}
		else if (i == 4 || i == 8) {
			if (moveUp(i) || moveRight(i) || moveDown(i)) return;
		}
		else if (i == 7 || i == 11) {
			if (moveUp(i) || moveLeft(i) || moveDown(i)) return;
		}
		else if (i == 5 || i == 6 || i == 9 || i == 10) {
			if (moveUp(i) || moveLeft(i) || moveDown(i) || moveRight(i)) return;
		}
		else if (i == 13 || i == 14) {
			if (moveLeft(i) || moveRight(i) || moveUp(i)) return;		
		}
		else if (i == 12) {
			if (moveRight(i) || moveUp(i)) return;
		}
		else {
			if (moveLeft(i) || moveUp(i)) return;
		}
	}
	function moveUp(i) {
		var piece1 = findPos(i);
		var piece2 = findPos(i - 4);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.posInfo;
			piece1.posInfo = piece2.posInfo;
			piece2.posInfo = temp;
			temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
	function moveDown(i) {
		var piece1 = findPos(i);
		var piece2 = findPos(i + 4);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.posInfo;
			piece1.posInfo = piece2.posInfo;
			piece2.posInfo = temp;
			temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
	function moveLeft(i) {
		var piece1 = findPos(i);
		var piece2 = findPos(i - 1);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.posInfo;
			piece1.posInfo = piece2.posInfo;
			piece2.posInfo = temp;
			temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
	function moveRight(i) {
		var piece1 = findPos(i);
		var piece2 = findPos(i + 1);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.posInfo;
			piece1.posInfo = piece2.posInfo;
			piece2.posInfo = temp;
			temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
}
function initial() {
	var gameArea = document.getElementById("gameArea");
	for (var i = 0; i < 16; i++) {
		if (i == 15) {
			var piece = document.createElement("div");
			pieces.push(new Pieces(piece, "blank", i, "top" + parseInt(i / 4) + " left" + i % 4));
			pieces[pieces.length - 1].setStyle();
			gameArea.appendChild(piece);
			break;
		}
		else {
			var piece = document.createElement("div");
			pieces.push(new Pieces(piece, "puzzle bg" + i, i, "top" + parseInt(i / 4) + " left" + i % 4));
			pieces[pieces.length - 1].setStyle();
			gameArea.appendChild(piece);
		}
	}
}

