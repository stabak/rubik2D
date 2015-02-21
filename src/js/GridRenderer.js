/**
 * Created by stabak on 21.02.2015.
 */

/**
 *
 * @param grid {Grid}
 * @param box {JQueryElement}
 * @constructor
 */
function GridRenderer(grid, box){
    this.grid = grid;
    this.box = box;
    this.Initialize(grid, box)
}

/**
 * Creates grid dom
 * @param grid
 * @param box
 * @constructor
 */
GridRenderer.prototype.Initialize = function(grid, box){
    for(var x=0; x<4; x++){
        var row = jQuery('<div/>', {
            class: 'row'
        }).appendTo(box);
        for(var y=0; y<4; y++) {
            jQuery('<div/>', {
                class: 'cell',
                text: x + '-' + y
            }).appendTo(row);
        }
    }
};

GridRenderer.prototype.Render = function(){

};