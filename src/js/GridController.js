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
}

GridController.prototype.OnMouseMove = function(e){
   if(e.which === 1 && this.leftButtonDown){
       this.mousePos = {x: e.pageX, y: e.pageY};
       // find out mouse direction
       console.log("mouse move. clicked pos: " + this.lastPressedPos.x + ", " + this.lastPressedPos.y +" current pos: "+ this.mousePos.x + ", "+this.mousePos.y);
       this.gridRenderer.OnMouseMove({x:this.mousePos.x, y:this.mousePos.y},
           {x:this.mousePos.x - this.lastPressedPos.x, y:this.mousePos.y - this.lastPressedPos.y});
   }
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
