function Pieces(block, styleInfo, pos, seq) {
	this.block = block;
	this.styleInfo = styleInfo;
	this.pos = pos;
	this.seq = seq;
	this.posInfo = "top" + parseInt(pos / 4) + " left" + pos % 4;
}
Pieces.prototype.setStyle = function() {
	this.updatePosInfo();
	this.block.className = this.styleInfo + " " + this.posInfo;
}
Pieces.prototype.updatePosInfo = function() {
	this.posInfo = "top" + parseInt(this.pos / 4) + " left" + this.pos % 4;
}

var pieces = new Array();
var gameOn = false;

function isGameOver() {
	for (var i = 0; i < 16; i++) {
		if (pieces[i].pos != pieces[i].seq) return false;
	}
	return true;
}
function findBlockByPos(pos) {
	if (pos > 15 || pos < 0) return false;
	for (var i = 0; i < 16; i++) {
		if (pieces[i].pos == pos) return pieces[i];
	}
}
function initial() {
	var gameArea = $("#gameArea");
	$("p").hide();
	for (var i = 0; i < 16; i++) {
		if (i == 15) {
			var block = $("<div></div>");
			pieces.push(new Pieces(block, "blank", i, i));
			pieces[pieces.length - 1].setStyle();
			gameArea.append(block);
			break;
		}
		else {
			var block = document.createElement("div");
			pieces.push(new Pieces(block, "puzzle bg" + i, i, i));
			pieces[pieces.length - 1].setStyle();
			gameArea.append(block);
		}
	}
}

$(document).ready(function() {
	var gameArea = $("#gameArea");
	initial();
	for (var i = 0; i < 16; i++) {
		pieces[i].block.onclick = (function(k) {
 			return function() {
				playermove(k);
			};
		})(i);
	}
	$("#restart").click(function() {
		var blocks = $("#gameArea > div");
		$("p").hide();
		for (var i = 0; i < 1000; i++) {
			var random = parseInt(Math.random() * 16);
			automove(random);
		}
		gameOn = true;
	});
	function automove(current) {
		move(current);
	}
	function playermove(current) {
		if (gameOn == false) return;
		else move(current);
		if (isGameOver()) {
			$('p').show();
			gameOn = false;
		} 
	}
	function move(current) {
		if (pieces[current].styleInfo == "blank") return;
		var i = pieces[current].pos;
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
		var piece1 = findBlockByPos(i);
		var piece2 = findBlockByPos(i - 4);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
	function moveDown(i) {
		var piece1 = findBlockByPos(i);
		var piece2 = findBlockByPos(i + 4);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
	function moveLeft(i) {
		var piece1 = findBlockByPos(i);
		var piece2 = findBlockByPos(i - 1);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
	function moveRight(i) {
		var piece1 = findBlockByPos(i);
		var piece2 = findBlockByPos(i + 1);
		if (piece2.styleInfo == "blank") {
			var temp = piece1.pos;
			piece1.pos = piece2.pos;
			piece2.pos = temp;
			piece1.setStyle();
			piece2.setStyle();
			return true;
		}
	}
});


