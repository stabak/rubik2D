/**
 * Created by stabak on 21.02.2015.
 */

/**
 * Main application class.
 * @param width {int}
 * @param height {int}
 * @constructor
 */

function Rubik(level, minLevel, maxLevel, gridArray){
    this.minLevel = minLevel;
    this.maxLevel = maxLevel;
    this.level = Math.min(Math.max(level, minLevel), maxLevel);

    this.containerCanvas = $('#container-canvas');

    if(typeof gridArray !== "undefined"){
        this.grid = new Grid(this.level+1, this.level+1, gridArray);
    }else{
        this.grid = new Grid(this.level+1, this.level+1);
        this.grid.MixRandomly(this.level*5);
    }

    this.gridRenderer = new GridRenderer(this.grid, this.containerCanvas);
    this.gridRenderer.Draw();

    this.gridController = new GridController(this.grid, this.gridRenderer, this.containerCanvas);
    this.totalMovementInThisLevel = 0;
}

Rubik.prototype.Init = function (level) {
    this.level = Math.min(Math.max(level, 1), 20);

    this.grid.init(this.level+1,this.level+1);
    this.grid.MixRandomly(this.level*5);

    this.gridRenderer.Init(this.grid);
    this.gridRenderer.Draw();
    this.totalMovementInThisLevel = 0;
}