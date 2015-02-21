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
    //TODO create a grid instance
    //var grid = new Grid(width, height);
    var gridRenderer = new GridRenderer(null /*grid*/, $("#main-container"));
}

$(window).load(function()
{
    rubik = new Rubik(4,4);
});