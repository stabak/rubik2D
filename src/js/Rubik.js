/**
 * Created by stabak on 21.02.2015.
 */

/**
 * Main application class.
 * @param width {int}
 * @param height {int}
 * @constructor
 */
function Rubik(width,height){
    var grid = new Grid(width, height);
    grid.MixRandomly(10);
    var box = $("#main-container");
    var gridRenderer = new GridRenderer(grid, 50, box);
    var gridController = new GridController(grid, gridRenderer, box);
}

$(window).load(function()
{
    rubik = new Rubik(5,5);
    soundmanager = new SoundManager();
    soundmanager.init();
    soundmanager.addSound("beep", "../audio/", "beep");
    soundmanager.addSound("tick", "../audio/", "Tick");
});