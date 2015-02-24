/**
 * Created by stabak on 21.02.2015.
 */

/**
 * Main application class.
 * @param width {int}
 * @param height {int}
 * @constructor
 */
var gridRenderer;

function Rubik(width,height){
    var grid = new Grid(width, height);
    grid.MixRandomly(10);
    var containerCanvas = $('#container-canvas').get(0);
    gridRenderer = new GridRendererCanvas(grid, containerCanvas);
    gridRenderer.Draw();

    gridRenderer.clickedPointInCanvas = {x:50,y:100};
    gridRenderer.shiftDirection = {x:0,y:0};
    gridRenderer.DrawShiftedCells();
    
    var gridController = new GridController(grid, gridRenderer, containerCanvas);
}

$(window).load(function()
{
    rubik = new Rubik(4,4);
    soundmanager = new SoundManager();
    soundmanager.init();
    soundmanager.addSound("beep", "../audio/", "beep");
    soundmanager.addSound("tick", "../audio/", "Tick");
});