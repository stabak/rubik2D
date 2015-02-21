/**
 * Created by akbay on 21/2/2015.
 */

function Cell(content) {
    this.initialContent = content;
    this.content = content;
}
Cell.prototype.isInitialState = function() {
    return this.initialContent == this.content;
};