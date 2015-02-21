/**
 This guy is responsible from listening to mouse and informing grid about user interactions
 */

/**
 *
 * @param grid {Grid}
 * @param gridRenderer {GridRenderer}
 * @param box {jQuery}
 * @constructor
 */
function GridController(grid, gridRenderer, box){
    this.grid = grid;
    this.gridRenderer = gridRenderer;

    box.mousedown(this.OnMouseDown.bind(this));
    box.mouseup(this.OnMouseUp.bind(this));
    box.mousemove(this.OnMouseMove.bind(this));

    this.leftButtonDown = false;
    this.lastPressedPos = null;
    this.lastMovementDirection = null;
    this.moveThreshold = 10;
}

GridController.prototype.OnMouseMove = function(e){
   if(e.which === 1 && this.leftButtonDown) {
       this.mousePos = {x: e.pageX, y: e.pageY};
       // find out mouse direction
       //console.log("mouse move. clicked pos: " + this.lastPressedPos.x + ", " + this.lastPressedPos.y +" current pos: "+ this.mousePos.x + ", "+this.mousePos.y);
       var dir = {x: this.mousePos.x - this.lastPressedPos.x, y: this.mousePos.y - this.lastPressedPos.y};

       if(dir.x>this.moveThreshold || dir.y > this.moveThreshold) {
           console.log("mouse move. dir: " + dir.x + ", " + dir.y);
           this.gridRenderer.OnMouseMove({x: this.mousePos.x, y: this.mousePos.y}, dir);
       }

       var normalizedDir = GetNormalizedDir(dir);
       var lastNormalizedDir = null;
       if (lastNormalizedDir != null) {
           lastNormalizedDir = GetNormalizedDir(this.lastMovementDirection);
       }

       if (lastNormalizedDir == null || (lastNormalizedDir.y > lastNormalizedDir.x && normalizedDir.y > normalizedDir.x)) {
           this.gridRenderer.OnMouseDirectionAxisChanged();
       }
       this.lastMovementDirection = dir;
   }
};

var GetNormalizedDir = function(vector){
    return {x: Math.abs(vector.x), y: Math.abs(vector.y)};
};

GridController.prototype.OnMouseUp = function(e){
    console.log("onmouse up");
    if(e.which === 1) {
        this.leftButtonDown = false;
        this.gridRenderer.OnMouseUp();
    }
};

GridController.prototype.OnMouseDown = function(e){
    console.log("onmouse down");
    if(e.which === 1) {
        this.leftButtonDown = true;
        this.lastPressedPos = {x: e.pageX, y: e.pageY};
        this.gridRenderer.OnMouseDown(this.lastPressedPos);
    }
};
