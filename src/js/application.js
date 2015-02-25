/**
 * Created by sena on 24/2/2015.
 */


$(window).load(function(){
    rubik = new Rubik(1,1,20);

    $('#NextButton').hide();
    $('#RepeatButton').hide();

    $('#NextButton').click(function() {
        rubik.Init(rubik.level+1);
        $('#NextButton').hide();
        $('#RepeatButton').hide();
        $('#LabelLevel').text('Level ' + rubik.level);
        $('#LabelBest').text('Score ' + 0);
        $('#LabelScore').text('Score ' + 0);
    });

    $('#RepeatButton').click(function() {
        rubik.Init(rubik.level);
        $('#NextButton').hide();
        $('#RepeatButton').hide();
        $('#LabelLevel').text('Level ' + rubik.level);
        $('#LabelBest').text('Score ' + 0);
        $('#LabelScore').text('Score ' + 0);
    });

    $( document ).on( "GridResolved", function( event, param1 ) {
        $('#NextButton').fadeIn( 300 );
        $('#RepeatButton').fadeIn( 300 );

    });
});




