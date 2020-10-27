const width = 50;
const rows = 10;
const cols = 10;
const gameHeight = width * rows;
const gameWidth = width * cols;
var bombCount = 10;

let canvas = document.getElementById("game-canvas");
canvas.setAttribute("width", width * cols);
canvas.setAttribute("height", width * rows);

const ctx = canvas.getContext('2d');

var Grid = [];

var Bombs = [];

function setup() {
    Grid = [];
    for (var j = 0; j < rows; j++) {
        var innerRow = [];
        for (var i = 0; i < cols; i++) {
            innerRow.push(new Cell(i, j));
        }
        Grid.push(innerRow);
    }

    for (var i = 0; i < bombCount; i++) {
        var pos = {
            y: Math.floor(Math.random() * rows),
            x: Math.floor(Math.random() * cols)
        }

        while (Bombs.filter(x => x.x == pos.x && x.y == pos.y).length > 0) {
            var pos = {
                y: Math.floor(Math.random() * rows),
                x: Math.floor(Math.random() * cols)
            }
        }

        Grid[pos.y][pos.x].bomb = true;
        Grid[pos.x][pos.y].getNeighbours().forEach(x => x.value += 1);
        Bombs.push(pos);
    }
}

setup();

function draw() {
    for (var j = 0; j < cols; j++) {
        for (var i = 0; i < rows; i++) {
            Grid[i][j].draw();
        }
    }
}

draw();

var test;

canvas.addEventListener("click", function (event) {
    var cell = getCell(event.layerX, event.layerY);
    var bombed = false;
    if (cell.bomb) {
        Grid.forEach(x => x.forEach(x => x.open = true));
        bombed = true;
    } else if (cell.value != 0) {
        cell.open = true;
    } else {
        cell.open = true;
        cell.openNeighbour();
    }
    draw();

    if (bombed) {
        messageBox("GAME OVER","red");
    }

    checkGameOver()
});

function messageBox(fillText, fillStyle, secondaryText = "", secondaryTextFillStyle = "#000"){
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = "0.5";
    ctx.fillRect(0, gameHeight/3, gameWidth, gameHeight/3);
    ctx.globalAlpha = "1.0";
    
    ctx.font = "30px Courier New";
    ctx.fillStyle = fillStyle;
    ctx.textAlign = "center";
    ctx.fillText(fillText, gameWidth/2, gameHeight/2);
    ctx.fillStyle = secondaryTextFillStyle;
    ctx.fillText(secondaryText, gameWidth/2, gameHeight/2 + 30);
}

function getCell(X, Y) {
    var lowerX = Math.floor(X / width);
    var lowerY = Math.floor(Y / width);

    return Grid[lowerY][lowerX];
}

function checkGameOver() {
    var open = 0;
    for (var j = 0; j < rows; j++) {
        open += Grid[j].filter(x => x.open).length;
    }

    if (((cols * rows) - open) == bombCount) {
        messageBox("YOU WIN!!!","green");
    }
}

