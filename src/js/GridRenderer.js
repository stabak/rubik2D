/**
 * Created by akbay on 23/2/2015.
 */

function GridRenderer(grid, containerCanvas){
    this.colors = ['red', 'green', 'blue', 'yellow', 'orange', 'white', 'teal', 'brown', 'olive', 'violet', 'darkred', 'darkgreen', 'darkblue', 'darkyellow', 'darkorange', 'gray', 'lightgreen', 'lightblue', 'lightyellow', 'lightgray', '#AB4E52'];

    this.containerCanvas = containerCanvas;
    this.ctx = containerCanvas[0].getContext('2d');

    this.Init(grid);
}

GridRenderer.prototype.Init = function(grid){
    this.grid = grid;
    this.cellContainerWidth = this.containerCanvas.width() / this.grid.width;
    this.cellContainerHeight = this.containerCanvas.height() / this.grid.height;
    this.cellWidth = this.cellContainerWidth * 0.9;
    this.cellHeight = this.cellContainerHeight * 0.9;
    this.cellHorizontalSeperation = this.cellContainerWidth * 0.1;
    this.cellVerticalSeperation = this.cellContainerHeight * 0.1;
    //this.containerCanvas.width() = this.cellContainerWidth*this.grid.width;
    //this.containerCanvas.height() = this.cellContainerHeight*this.grid.height;

    this.clickedPointIndex = {x:0,y:0};
    this.clickedPointInCanvas = {x:0,y:0};
    this.shiftDirection = {x:0,y:0};

}

GridRenderer.prototype.CalculateIntegerSizes = function(){
    this.cellContainerWidth = Math.floor( this.cellContainerWidth );
    this.cellContainerHeight = Math.floor( this.cellContainerHeight );
    this.cellWidth = Math.floor( this.cellWidth );
    this.cellHeight = Math.floor(  this.cellHeight );
    this.cellHorizontalSeperation = Math.floor( this.cellHorizontalSeperation );
    this.cellVerticalSeperation = Math.floor( this.cellVerticalSeperation );

}

GridRenderer.prototype.Draw = function(){
    this.ctx.clearRect(0,0,this.containerCanvas.width(),this.containerCanvas.height());

    for (var i = 0; i < this.grid.width; i++) {
        for(var j = 0; j < this.grid.height; j++) {
            this.DrawCell( i, j, 0, 0);
        }
    }
}

GridRenderer.prototype.DrawShiftedCells = function(){
    this.CalculateClickedCellIndex();
    var visibleShift;
    var it = 0;
    var i = 0;
    if (this.shiftDirection.x !== 0) {
        this.DrawBlackRow(this.clickedPointIndex.y);
        visibleShift = this.shiftDirection.x - Math.floor(this.shiftDirection.x /this.containerCanvas.width())*this.containerCanvas.width();

        for (it = -1; it < 1; it++) {
            for (i = 0; i < this.grid.width; i++) {
                this.DrawCell( i, this.clickedPointIndex.y, visibleShift + it*this.containerCanvas.width(), 0);
            }
        }

    }else if (this.shiftDirection.y !== 0) {
        this.DrawBlackColumn(this.clickedPointIndex.x);
        visibleShift = this.shiftDirection.y - Math.floor(this.shiftDirection.y /this.containerCanvas.height())*this.containerCanvas.height();

        for (it = -1; it < 1; it++) {
            for (i = 0; i < this.grid.height; i++) {
                this.DrawCell( this.clickedPointIndex.x, i, 0, visibleShift + it*this.containerCanvas.height());
            }
        }
    }
}

GridRenderer.prototype.CalculateClickedCellIndex = function(){
    this.clickedPointIndex.x = Math.floor(this.clickedPointInCanvas.x / this.cellContainerWidth);
    this.clickedPointIndex.y = Math.floor(this.clickedPointInCanvas.y / this.cellContainerHeight);
}

GridRenderer.prototype.DrawCell = function(indexX, indexY, shiftX, shiftY){
    this.ctx.save();
    var X = Math.floor( this.cellHorizontalSeperation*0.5 + indexX * (this.cellWidth + this.cellHorizontalSeperation)) + shiftX;
    var Y = Math.floor( this.cellVerticalSeperation*0.5 + indexY * (this.cellHeight + this.cellVerticalSeperation)) + shiftY;
    this.ctx.fillStyle = this.colors[this.grid.array[indexY][indexX].content];
    this.ctx.fillRect (X, Y, this.cellWidth, this.cellHeight);
    this.ctx.restore();
}

GridRenderer.prototype.DrawBlackRow = function(indexRow){
    this.ctx.save();
    var X = 0;
    var Y = Math.floor( this.cellVerticalSeperation*0.5 + indexRow * (this.cellHeight + this.cellVerticalSeperation));
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect (X, Y, this.containerCanvas.width(), this.cellHeight);
    this.ctx.restore();
}

GridRenderer.prototype.DrawBlackColumn = function(indexColumn){
    var X = Math.floor( this.cellHorizontalSeperation*0.5 + indexColumn * (this.cellWidth + this.cellHorizontalSeperation));
    var Y = 0;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect (X, Y, this.cellWidth, this.containerCanvas.height());
}