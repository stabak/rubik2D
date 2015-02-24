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
var soundmanager;

function Rubik(width,height){
    var grid = new Grid(width, height);
    grid.MixRandomly(10);
    var containerCanvas = $('#container-canvas');
    gridRenderer = new GridRenderer(grid, containerCanvas);
    gridRenderer.Draw();
    var gridController = new GridController(grid, gridRenderer, containerCanvas);
}

$(window).load(function()
{
    rubik = new Rubik(6,4);
    soundmanager = new SoundManager();
    soundmanager.addSound("beep", "../audio/", "beep");
    soundmanager.addSound("tick", "../audio/", "Tick");
});