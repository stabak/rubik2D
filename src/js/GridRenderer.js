/**
 * Created by stabak on 21.02.2015.
 */

/**
 *
 * @param grid {Grid}
 * @param cellSize {int}
 * @param box {jQuery}
 * @constructor
 */

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'black',  'white', 'teal', 'brown', 'olive', 'violet'];


function GridRenderer(grid, cellSize, box){
    this.grid = grid;
    this.cells = {};
    this.cellSize = cellSize;
    this.box = box;
    this.Initialize();

    this.clickedCell = null;
    this.draggedGroup;
    this.reflection;
    this.axis;
}

/**
 * Creates grid dom
 * @constructor
 */
GridRenderer.prototype.Initialize = function(){
    for(var y=0; y<this.grid.height; y++){
        var row = $('<div/>', {
            class: 'row'
        }).appendTo(this.box);
        for(var x=0; x<this.grid.width; x++) {
            var cell = $('<div/>', {
                class: 'cell',
                text: x + '-' + y,
                style: 'background-color: '+ colors[this.grid.GetCell(x,y).content] + ';'
            }).appendTo(row);
            this.cells[this.GetCellIndex(x, y)] = cell[0];
        }
    }
};

GridRenderer.prototype.GetRow = function(_y, cloneNode){
    var row = [];
    for(var x=0; x<this.grid.width; x++){
        if(cloneNode) {
            row[row.length] = this.cells[this.GetCellIndex(x, _y)].cloneNode(true);
        }else {
            row[row.length] = this.cells[this.GetCellIndex(x, _y)];
        }
    }
    return row;
};

GridRenderer.prototype.GetColumn = function(_x, cloneNode) {
    var column = [];
    for(var y=0; y<this.grid.height; y++) {
        if(cloneNode) {
            column[column.length] = this.cells[this.GetCellIndex(_x, y)].cloneNode(true);
        }else{
            column[column.length] = this.cells[this.GetCellIndex(_x, y)];
        }
    }
    return column;
};

GridRenderer.prototype.GetCellIndex = function(x,y){
    return y*(this.grid.width) + x;
};

/**
 *
 * @param pos
 * @param dir
 * @constructor
 */
GridRenderer.prototype.OnMouseMove = function(pos, dir){
    var x = dir.x;
    var y = dir.y;

    if( this.reflection == null){
        var cells;
        this.axis = this.GetAxis(dir);
        if(this.axis == axis.x){
            cells = $(this.GetRow(this.clickedCell.y, true));
            this.draggedGroup = $(this.GetRow(this.clickedCell.y, false));
        }else{
            cells = $(this.GetColumn(this.clickedCell.x, true));
            this.draggedGroup = $(this.GetColumn(this.clickedCell.x, false));
        }
        this.draggedGroup.css('visibility', 'hidden');
        var extendedArray = cells.toArray();
        var length = extendedArray.length;
        var count =1;
        do {
            for (var i = 0; i < length; i++) {
                extendedArray[extendedArray.length] = extendedArray[i].cloneNode(true);
            }
        }while(count++ < 2);

        var pos = this.GetCellPosition(this.clickedCell);
        var onePieceWidth = this.grid.width * this.cellSize;
        this.reflection = $('<div/>', {
            class: 'reflection'
        }).appendTo(this.box);
        this.reflection.offset({left: pos.x - onePieceWidth, top: pos.y});
        this.reflection.append(extendedArray);
        if(this.axis == axis.y){
            this.reflection.width(this.cellSize);
        }
    }

    if(this.axis == axis.x) {
        this.reflection.css("margin-left", x);
    }else{
        this.reflection.css("margin-top", y);
        var left = this.GetCellPosition(this.clickedCell).x;
        this.reflection.css("margin-left", left);
    }
};

var axis = {
    x: 'x',
    y: 'y'
};

GridRenderer.prototype.GetAxis = function(dir) {
    return Math.abs(dir.x) > Math.abs(dir.y) ? axis.x : axis.y;
};

GridRenderer.prototype.OnMouseDirectionAxisChanged = function() {
    //this.reflection =
};

GridRenderer.prototype.OnMouseDown = function(pos) {
    // find out which cell pos lies in.
    var boxPos = this.GetPosition();
    var diff = {x: pos.x - boxPos.x, y: pos.y - boxPos.y};
    this.clickedCell = {x: Math.floor(diff.x / this.cellSize), y: Math.floor(diff.y / this.cellSize)};
    console.log("clicked cell: " + this.clickedCell.x + ", " + this.clickedCell.y);
};

GridRenderer.prototype.OnMouseUp = function() {
    this.reflection.remove();
    this.reflection = null;
    this.draggedGroup.css('visibility', 'visible');
    this.draggedGroup = null;
};

GridRenderer.prototype.GetPosition = function() {
    return {x: this.box.offset().left, y: this.box.offset().top};
};

GridRenderer.prototype.GetCellPosition = function(cell) {
    var pos = this.GetPosition();
    return {x: pos.x + cell.x * this.cellSize, y: pos.y + cell.y * this.cellSize};
};