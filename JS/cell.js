class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.bomb = false;
        this.value = 0;
        this.open = false;
    }

    draw(fillStyle = "lightgrey", strokeStyle = "grey") {
        if (this.open && this.bomb) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.i * width, this.j * width, width, width);
        } else if (this.open) {
            ctx.fillStyle = "white";
            ctx.fillRect(this.i * width, this.j * width, width, width);
            ctx.fillStyle = "black";
            if (this.value != 0) {
                ctx.font = "20px Arial";
                ctx.fillText(this.value, this.i * width + width / 3, this.j * width + 2 * width / 3, width);
            }
        } else {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(this.i * width, this.j * width, width, width);
        }

        ctx.strokeStyle = strokeStyle;
        ctx.strokeRect(this.i * width, this.j * width, width, width);
    }

    getNeighbours() {
        var neighbour = [];
        if (Grid[this.i - 1] && Grid[this.i - 1][this.j - 1]) neighbour.push(Grid[this.i - 1][this.j - 1]);
        if (Grid[this.i] && Grid[this.i][this.j - 1]) neighbour.push(Grid[this.i][this.j - 1]);
        if (Grid[this.i + 1] && Grid[this.i + 1][this.j - 1]) neighbour.push(Grid[this.i + 1][this.j - 1]);
        if (Grid[this.i + 1] && Grid[this.i + 1][this.j]) neighbour.push(Grid[this.i + 1][this.j]);
        if (Grid[this.i + 1] && Grid[this.i + 1][this.j + 1]) neighbour.push(Grid[this.i + 1][this.j + 1]);
        if (Grid[this.i] && Grid[this.i][this.j + 1]) neighbour.push(Grid[this.i][this.j + 1]);
        if (Grid[this.i - 1] && Grid[this.i - 1][this.j + 1]) neighbour.push(Grid[this.i - 1][this.j + 1]);
        if (Grid[this.i - 1] && Grid[this.i - 1][this.j]) neighbour.push(Grid[this.i - 1][this.j]);
        return neighbour;
    }

    highlightNeighbours() {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "green";
        ctx.fillRect(this.i * width, this.j * width, width, width);

        Grid[this.i][this.j].getNeighbours().forEach(function (value) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(value.i * width, value.j * width, width, width);
        });
        ctx.globalAlpha = 1;
    }

    openNeighbour() {
        var notOpenGrid = Grid[this.i][this.j].getNeighbours().filter(x => !x.open && !x.bomb); 
        notOpenGrid.forEach(x => x.open = true);
        notOpenGrid.filter(x => x.value == 0).forEach(x => x.openNeighbour());
    }
}