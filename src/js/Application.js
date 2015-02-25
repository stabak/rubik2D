/**
 * Created by sena on 24/2/2015.
 */


$(window).load(function(){
    var rubik = new Rubik(1,1,20);
    UpdateGUIForNewLevel(rubik);

    $('#NextButton').hide();
    $('#RepeatButton').hide();

    $('#NextButton').click(function() {
        rubik.Init(rubik.level+1);
        UpdateGUIForNewLevel(rubik);
    });

    $('#RepeatButton').click(function() {
        rubik.Init(rubik.level);
        UpdateGUIForNewLevel(rubik);
    });

    $( document ).on( "GridResolved", function( event ) {
        $('#NextButton').fadeIn( 300 );
        $('#RepeatButton').fadeIn( 300 );
        UpdateBestScore();
    });

    $( '#LabelScore' ).on( "UpdateScore", function( event, param1 ) {
        rubik.totalMovementInThisLevel += param1;
        $('#LabelScore').text('Score ' + rubik.totalMovementInThisLevel);

    });

    function UpdateGUIForNewLevel(){
        $('#NextButton').hide();
        $('#RepeatButton').hide();
        $('#LabelLevel').text('Level ' + rubik.level);
        $('#LabelScore').text('Score ' + 0);
        if (typeof(Storage) != "undefined") {
            var currentBest = localStorage.getItem("BestScoreLevel"+rubik.level);
            if(currentBest !== null){
                $('#LabelBest').text('Best ' + currentBest);
            }else{
                $('#LabelBest').text('Best ');
            }
        }
    }

    function UpdateBestScore(){
        if (typeof(Storage) != "undefined") {
            var currentBest = localStorage.getItem("BestScoreLevel"+rubik.level);
            if(currentBest === null){
                localStorage.setItem("BestScoreLevel"+rubik.level, rubik.totalMovementInThisLevel);
                $('#LabelBest').html('Best ' + rubik.totalMovementInThisLevel + "<font color='#7cfc00'> New!</font>");
                //alert("New Best Score!!!! Level " + rubik.level);
            }else{
                if(currentBest > rubik.totalMovementInThisLevel){
                    localStorage.setItem("BestScoreLevel"+rubik.level, rubik.totalMovementInThisLevel);
                    $('#LabelBest').html('Best ' + rubik.totalMovementInThisLevel + " <font color='#7cfc00'>New!</font>");
                    //alert("New Best Score!!!! Level " + rubik.level);
                }
            }
        }
    }

});




