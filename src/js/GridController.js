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
function GridController(grid, gridRenderer, containerCanvas){
    this.grid = grid;
    this.gridRenderer = gridRenderer;
    this.containerCanvas = containerCanvas;

    this.containerCanvas.mousedown( this.OnMouseDown.bind(this));
    //this.containerCanvas.mouseup(this.OnMouseUp.bind(this));
    //this.containerCanvas.mousemove(this.OnMouseMove.bind(this));

    var body = $('body');
    body.mouseup(this.OnMouseUp.bind(this));
    body.mousemove(this.OnMouseMove.bind(this));

    body.on("touchstart",this.OnTouchStart.bind(this));
    body.on("touchmove", this.OnTouchMove.bind(this));
    body.on("touchend", this.OnTouchEnd.bind(this));

    this.soundmanager = new SoundManager();

    this.shiftThreshold = 10;
    this.reset();
    this.hoveredCellIndex = undefined;
}

GridController.prototype.reset = function(){
    this.isGridShifting = false;
    this.isShiftingDirectionSelected = false;
    this.selectedShiftingDirection = "";

    this.mouseDownPosInPage = {x: 0, y: 0};
    this.mouseDownPosInCanvas = {x: 0, y: 0};
    this.difDirection = {x: 0, y: 0};

    this.gridRenderer.clickedPointInCanvas = {x: 0, y: 0};
    this.gridRenderer.shiftDirection = {x: 0, y: 0};
}

GridController.prototype.OnMouseMove = function(e){
    var mousePosInCanvas = {x:  e.pageX - this.containerCanvas.offset().left, y: e.pageY - this.containerCanvas.offset().top};

    // DrawHighlightCell
    //var hoveredCellIndex = this.gridRenderer.CalculateCellIndex(mousePosInCanvas.x,mousePosInCanvas.y);
    //
    //if(hoveredCellIndex !== undefined) {
    //    console.log(hoveredCellIndex.x + " " + hoveredCellIndex.y);
    //    if(this.hoveredCellIndex !== hoveredCellIndex){
    //        if(this.hoveredCellIndex !== undefined){
    //            this.gridRenderer.DrawCell(this.hoveredCellIndex.x, this.hoveredCellIndex.y, 0, 0);
    //        }
    //        this.hoveredCellIndex = hoveredCellIndex;
    //        if(!this.isGridShifting){
    //            this.gridRenderer.DrawHighlightCell(this.hoveredCellIndex.x, this.hoveredCellIndex.y, 0, 0);
    //        }
    //    }
    //}else{
    //    console.log("mouse not in canvas");
    //
    //    if(this.hoveredCellIndex !== undefined){
    //        this.gridRenderer.DrawCell(this.hoveredCellIndex.x, this.hoveredCellIndex.y, 0, 0);
    //        this.hoveredCellIndex = undefined;
    //    }
    //}

    if(this.isGridShifting){
        //console.log("onmouse move");

        var mousePos = {x: e.pageX, y: e.pageY};


        this.difDirection = {x: mousePos.x - this.mouseDownPosInPage.x , y: mousePos.y - this.mouseDownPosInPage.y};

        if(this.isShiftingDirectionSelected === false){
            if(Math.abs(this.difDirection.x) > Math.abs(this.difDirection.y) && Math.abs(this.difDirection.x) > this.shiftThreshold){
                this.selectedShiftingDirection = "row";
                this.isShiftingDirectionSelected = true;
            }else if (Math.abs(this.difDirection.y) > Math.abs(this.difDirection.x) && Math.abs(this.difDirection.y) > this.shiftThreshold){
                this.selectedShiftingDirection = "column";
                this.isShiftingDirectionSelected = true;
            }
        }
        if(this.isShiftingDirectionSelected){
            if(this.selectedShiftingDirection === "row"){
                this.difDirection.y = 0;
            }else if(this.selectedShiftingDirection === "column"){
                this.difDirection.x = 0;
            }
            this.gridRenderer.clickedPointInCanvas = this.mouseDownPosInCanvas;
            this.gridRenderer.shiftDirection = this.difDirection;
            this.gridRenderer.DrawShiftedCells();
            //$('body').line(this.mouseDownPosInPage.x, this.mouseDownPosInPage.y, this.mouseDownPosInPage.x + this.difDirection.x, this.mouseDownPosInPage.y + this.difDirection.y, {color:"red", zindex:1});
        }
    }
};

GridController.prototype.OnMouseUp = function(e){
    if(this.isGridShifting){

        var directionInCellSize = { x: Math.round(this.difDirection.x/this.gridRenderer.cellContainerWidth)%this.grid.width, y: Math.round(this.difDirection.y/this.gridRenderer.cellContainerHeight)%this.grid.height};
        //console.log("onmouse up " + directionInCellSize.x + " " + directionInCellSize.y);
        if( directionInCellSize.x !== 0 || directionInCellSize.y !== 0){
            $( '#LabelScore' ).trigger( "UpdateScore", Math.abs(directionInCellSize.x + directionInCellSize.y ));
            this.grid.Shift(this.gridRenderer.clickedPointIndex, directionInCellSize);
        }

        this.gridRenderer.Draw();
        if(this.grid.resolved){
            this.gridRenderer.FadeoutBord();
        }
        this.reset();
    }
};

GridController.prototype.OnMouseDown = function(e){
    //console.log("onmouse down");
    if(!this.grid.resolved){
        this.soundmanager.play("tick");
        if(e.which === 1){
            this.isGridShifting = true;
            this.mouseDownPosInPage = {x: e.pageX, y: e.pageY};
            this.mouseDownPosInCanvas = {x:  e.pageX - this.containerCanvas.offset().left, y: e.pageY - this.containerCanvas.offset().top};
        }
    }
};

GridController.prototype.OnTouchMove = function(e){
    var touchobj = e.originalEvent.changedTouches[0];
    var eventaaa = {pageX: Math.floor( touchobj.clientX), pageY: Math.floor( touchobj.clientY), which:1};
    this.OnMouseMove(eventaaa);
    console.log("touch move " + touchobj.clientX + " " + touchobj.clientY);
};

GridController.prototype.OnTouchEnd = function(e){
    var touchobj = e.originalEvent.changedTouches[0];
    var eventaaa = {pageX: Math.floor( touchobj.clientX), pageY: Math.floor( touchobj.clientY), which:1};
    this.OnMouseUp(eventaaa);
    console.log("touch End " + touchobj.clientX + " " + touchobj.clientY);
};

GridController.prototype.OnTouchStart = function(e){
    var touchobj = e.originalEvent.changedTouches[0];
    var eventaaa = {pageX: Math.floor( touchobj.clientX), pageY: Math.floor( touchobj.clientY), which:1};
    this.OnMouseDown(eventaaa);
    console.log("touch start " + touchobj.clientX + " " + touchobj.clientY);
};