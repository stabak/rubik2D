/**
 * Created by akbay on 21/2/2015.
 */

function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.array = [];
}
Grid.prototype.init = function() {
    //List of cells: nxm
    //Initialize with cell values
    this.array = new Array(this.height);

    for (var i = 0; i < this.height; i++) {
        this.array[i] = new Array(this.width);
        for(var j = 0; j < this.width; j++) {
            this.array[i][j] = new Cell(i);
        }
    }
};

Grid.prototype.GetCell = function(x,y) {
    return this.array[x][y];
};

Grid.prototype.Shift = function(cellPos, direction) {
    if(direction.x == 0){ //column
        this.ShiftColumn(cellPos.x,direction.y);
    }else if(direction.y == 0){ //row
        this.ShiftRow(cellPos.y,direction.x);
    }
};

Grid.prototype.ShiftColumn = function(index, direction) {
    var normalizedDirection = 0;
    if(direction<0) normalizedDirection = -1;
    else if(direction>0) normalizedDirection = 1;

    for(var c = 0; c<Math.abs(direction); c++){
        var tmpArray = this.GetColumnClone(index);
        if (tmpArray != undefined) {
            for (var i = 0; i < this.array.length; i++) {
                var next = i + normalizedDirection;
                if (next < 0) {
                    next = this.array.length-1;
                }else if (next>this.array.length-1) {
                    next = 0
                }
                this.array[i][index].content = tmpArray[next].content;
            }
        }
    }
};

Grid.prototype.ShiftRow = function(index, direction) {
    var normalizedDirection = 0;
    if(direction<0) normalizedDirection = -1;
    else if(direction>0) normalizedDirection = 1;

    for(var c = 0; c<Math.abs(direction); c++){
        var tmpArray = this.GetRowClone(index);
        if (tmpArray != undefined) {
            for (var i = 0; i < this.array[0].length; i++) {
                var next = i + normalizedDirection;
                if (next < 0) {
                    next = this.array[0].length-1;
                }else if (next>this.array[0].length-1) {
                    next = 0
                }
                this.array[index][i].content = tmpArray[next].content;
            }
        }
    }
};

Grid.prototype.MixRandomly = function() {

};

Grid.prototype.IsResolved = function() {
    for(var i = 0; i<array.length; i++){
        for(var j =0; j< array[i].length-1; j++){
            // TODO
        }
    }
};

Grid.prototype.GetRowClone = function(index) {
    if( index < 0 || index > this.array.length - 1 ){
        alert("index is not in grid");
        return undefined;
    }
    var tmpArray = [this.array[0].length];
    for (var j = 0; j<this.array[0].length; j++) {
        var newCell = new Cell(1);
        newCell.content = this.array[index][j].content;
        newCell.initialContent = this.array[index][j].initialContent;
        tmpArray[j] = newCell;
    }
    return tmpArray;
};

Grid.prototype.GetColumnClone = function(index) {
    if( index < 0 || index > this.array[0].length - 1 ){
        alert("index is not in grid");
        return undefined;
    }
    var tmpArray = [this.array.length];
    for (var j = 0; j<this.array.length; j++) {
        var newCell = new Cell(1);
        newCell.content = this.array[j][index].content;
        newCell.initialContent = this.array[j][index].initialContent;
        tmpArray[j] = newCell;
    }
    return tmpArray;
};

Grid.prototype.toString = function() {
    var str = "";
    for(var i = 0; i<this.array.length; i++){
        for(var j =0; j< this.array[0].length; j++){
            str += this.array[i][j].content + " ";
        }
        str += "\n";
    }
    return str;
};


