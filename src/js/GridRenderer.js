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
function GridRenderer(grid, cellSize, box){
    this.grid = grid;
    this.cells = {};
    this.cellSize = cellSize;
    this.box = box;
    this.Initialize();

    this.clickedCell = null;
    this.moveThreshold = 10;
}

/**
 * Creates grid dom
 * @constructor
 */
GridRenderer.prototype.Initialize = function(){
    for(var y=0; y<this.grid.height; y++){
        var row = jQuery('<div/>', {
            class: 'row'
        }).appendTo(this.box);
        for(var x=0; x<this.grid.width; x++) {
            var cell = jQuery('<div/>', {
                class: 'cell',
                text: x + '-' + y
            }).appendTo(row);
            this.cells[this.GetCellIndex(x, y)] = cell[0];
        }
    }
};

GridRenderer.prototype.GetRow = function(_y){
    var row = [];
    for(var x=0; x<this.grid.width; x++){
        row[row.length] = this.cells[this.GetCellIndex(x, _y)];
    }
    return row;
};

GridRenderer.prototype.GetColumn = function(_x) {
    var column = [];
    for(var y=0; y<this.grid.height; y++) {
        column[column.length] = this.cells[this.GetCellIndex(_x, y)];
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
    var cells;
    if(x>y){
        if(x>this.moveThreshold) {
            cells = this.GetRow(this.clickedCell.y);
            $(cells[0]).css('margin-left', x);
        }
    }else{
        if(y>this.moveThreshold) {
            cells = this.GetColumn(this.clickedCell.x);
            $(cells[0]).css('margin-top', y);
        }
    }
};

GridRenderer.prototype.OnMouseDown = function(pos) {
    // find out which cell pos lies in.
    var boxPos = this.GetPosition();
    var diff = {x: pos.x - boxPos.x, y: pos.y - boxPos.y};
    this.clickedCell = {x: Math.floor(diff.x / this.cellSize), y: Math.floor(diff.y / this.cellSize)};
    console.log("clicked cell: " + this.clickedCell.x + ", " + this.clickedCell.y);
};

GridRenderer.prototype.OnMouseUp = function() {

};

GridRenderer.prototype.GetPosition = function() {
    return {x: this.box.offset().left, y: this.box.offset().top};
};
