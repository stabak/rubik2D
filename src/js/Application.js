/**
 * Created by sena on 24/2/2015.
 */


$(document).ready(function(){
    var rubik;

    if (typeof(Storage) != "undefined") {

        var savedGridArrayText = localStorage.getItem("SavedGridArray");
        var level = localStorage.getItem("SavedRubikLevel");

        if(savedGridArrayText !== null && level !== null){
            var savedGridArray = JSON.parse(savedGridArrayText);
            rubik = new Rubik(level,1,20, savedGridArray);
        }else{
            rubik = new Rubik(1,1,20);
        }
    }else{
        rubik = new Rubik(1,1,20);
    }

    UpdateGUIForNewLevel(rubik);

    if(rubik.grid.IsResolved()){
        rubik.gridRenderer.FadeoutBord();
        $('#NextButton').fadeIn( 300 );
        $('#RepeatButton').fadeIn( 300 );
    }

    $('#NextButton').click(function() {
        rubik.Init(rubik.level+1);
        UpdateGUIForNewLevel();
    });

    $('#RepeatButton').click(function() {
        rubik.Init(rubik.level);
        UpdateGUIForNewLevel();
    });

    $('#NextLevelButton').click(function() {
        rubik.Init(rubik.level+1);
        UpdateGUIForNewLevel();
    });

    $('#PreviousLevelButton').click(function() {
        rubik.Init(rubik.level-1);
        UpdateGUIForNewLevel();
    });

    $( window ).unload( function() {
        if (typeof(Storage) != "undefined") {
            localStorage.setItem("SavedRubikLevel", rubik.level);
            localStorage.setItem("SavedGridArray", JSON.stringify(rubik.grid.array));
        }
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
                $('#NextLevelButton').removeAttr('disabled');
            }else{
                $('#LabelBest').text('Best ---');
                $('#NextLevelButton').attr('disabled','true');
            }
        }

        if(rubik.level === 1){
            $('#PreviousLevelButton').attr('disabled','true');
        }else{
            $('#PreviousLevelButton').removeAttr('disabled');
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




