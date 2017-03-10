window.onload = function()
{
	$("#shufflebutton")[0].onclick = shuffle;
	$("#change")[0].onchange = change;
	placeElements();
};


function change(event) {
	var selected = $("#change option:selected").val();
	if(selected == "One Plus")
	{
		$('#hint .image')[0].src = './img/oneplus.jpg';
		$('.piece').css({"background-image":"url('./img/oneplus.jpg')"});
	}
	else if(selected == "Pegman"){
		$('#hint .image')[0].src = './img/xiaohuangren.jpg';
		$('.piece').css({"background-image":"url('./img/xiaohuangren.jpg')"});
	}
	else{
		$('#hint .image')[0].src = './img/qk.jpg';
		$('.piece').css({"background-image":"url('./img/qk.jpg')"});
	}
}

var numberOn_Piece = [];
function placeElements()
{
	var pieceArray = $("#fifteen div");
	for (var i = 0; i < pieceArray.length; i++) {
		pieceArray[i].className = "piece";
		pieceArray[i].id = i;
		numberOn_Piece[i] = i + 1;
		setPosition(pieceArray[i], i);
		setBackground(pieceArray[i], i);
		//只有能移动的块才添加鼠标划过效果，所以使用JS写而不用CSS
		pieceArray[i].onclick = move;
		pieceArray[i].onmouseover = highlight;
		pieceArray[i].onmouseout = dehighlight;
	}
	numberOn_Piece[pieceArray.length] = 0;
}

var size = 4;
function setPosition(piece, index)
{
	//index -> (x, y)
	var x = Math.floor(index / size);
	var y = index % size;

    var fromTheTopEdge = x * (400 / size);
    var fromTheLeftEdge = y * (400 / size);
    piece.style.top = fromTheTopEdge + "px";
    piece.style.left = fromTheLeftEdge + "px";
}

function setBackground(piece, index)
{
    var x = Math.floor(index / size);
    var y = index % size;
    var fromTheRightEdge = 400 - x * (400 / size);
    var fromTheBottomEdge = 400 - y * (400 / size);
    piece.style.backgroundPosition = fromTheBottomEdge + "px " + fromTheRightEdge + "px";
	//平移多少
}

function move(event)
{
	var index = parseInt(this.id);
	var dest = canMoveTo(index);
	if (dest != -1) {
		movePieceFromTo(this, index, dest);
		//Reset the numberOn_Piece[i]
		numberOn_Piece[dest] = numberOn_Piece[index];
		numberOn_Piece[index] = 0;
		this.id = dest;
	}

	//是否完成
	var pieceArray = $("#fifteen div");
	var correctCount = 0;
	for (var i = 0; i < pieceArray.length; i++) {
		if (numberOn_Piece[i] == i + 1)
			correctCount++;
	}
	if (numberOn_Piece[pieceArray.length] == 0)
		correctCount++;
	if (correctCount == 16) {
		$('body').css({"background-image":"url('./img/win.jpg')"});
		$("#fifteen div").css({"opacity":"0.2"});
	}
	else {
		$('body').css({"background-image":"url('./img/background.png')"});
		$("#fifteen div").css({"opacity":"1"});
	}
}

function movePieceFromTo(piece, index, dest)
{
	//Calculation
	var fromX = Math.floor(index / size) * (400 / size);
	var fromY = (index % size) * (400 / size);
	var destX = Math.floor(dest / size) * (400 / size);
	var destY = (dest % size) * (400 / size);
	var interval = 10;

	//动画
	var i = 0;
	if (fromX == destX) {
		for (i = 1; i <= 100 / interval; i++)
			setTimeout(stepMoveTo, i * interval, piece, fromX, fromY + (destY-fromY)/(100/interval) * i);
	}
	else {
		for (i = 1; i <= 100 / interval; i++)
			setTimeout(stepMoveTo, i * interval, piece, fromX + (destX-fromX)/(100/interval) * i, fromY);
	}
}

function canMoveTo(index)
{
	var destination = null;
	var left = index - 1;
	var right = index + 1;
	var up = index - 4;
	var down = index + 4;

	if (left >= 0 && left < 16)
		if (numberOn_Piece[left] == 0 && index % size != 0) {//左边格子没有东西&&有左边
			return left;
		}
	if (right >= 0 && right < 16)
		if (numberOn_Piece[right] == 0 && index % size != 3) {
			return right;
		}
	if (up >= 0 && up < 16)
		if (numberOn_Piece[up] == 0 && Math.floor(index / size) != 0) {
			return up;
		}
	if (down >= 0 && down < 16)
		if (numberOn_Piece[down] == 0 && Math.floor(index / size) != 3) {
			return down;
		}
	return -1;
}

//Caller: movePiece
function stepMoveTo(piece, x, y)
{
	piece.style.top = x + "px";
	piece.style.left = y + "px";
}

//判断是否需要变红
function highlight(event)
{
	if (canMoveTo(parseInt(this.id)) != -1) {
		this.style.borderColor = "red";
		this.style.color = "red";
		this.style.fontSize = "32pt";
		this.style.width = "110px";
		this.style.height = "110px";
		this.style.transform = "transLateX(-7px) translateY(-7px)";
		this.style.zIndex = "999";
		this.style.boxShadow = "3px 3px 3px rgba(0, 0, 0, 1)";
	}
}

function dehighlight(event)
{
	this.style.borderColor = "gray";
    this.style.color = "gray";
	this.style.fontSize = "26pt";
	this.style.width = "96px";
	this.style.height = "96px";
	this.style.zIndex = "10";
	this.style.transform = "";
	this.style.boxShadow = "";
}

function shuffle(event)
{
	$('body').css({"background-image":"url('./img/background.png')"});
	$("#fifteen div").css({"opacity":"1"});
	var pieceArray = $("#fifteen div");
	for (var step = 0; step < 200; step++) {//随机走动打乱，避免无解情况产生
		list = [];
		for (var i = 0; i < pieceArray.length; i++) {
			var tempIndex = parseInt(pieceArray[i].id);
			if (canMoveTo(tempIndex) != -1)
				list.push(pieceArray[i]);
		}
		var piece = list[Math.floor(Math.random() * list.length)];
		var index = parseInt(piece.id);
		var dest = canMoveTo(index);
		movePieceFromTo(piece, index, dest);
		numberOn_Piece[dest] = numberOn_Piece[index];
		numberOn_Piece[index] = 0;
		piece.id = dest;
		list = [];
	}
	
}
