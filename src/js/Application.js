/**
 * Created by sena on 24/2/2015.
 */

var ratio = 0.85;
var isDeviceMob = false;

function detectmob() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

function AdjustSize(){
    var canvas = $("#container-canvas")[0];
    var width = $(window).width();
    var height = $(window).height();

    if(width > height){
        canvas.width = height*ratio;
        canvas.height = height*ratio;
    }else{
        canvas.width = width*ratio;
        canvas.height = width*ratio;
    }
}

$( window ).on( "orientationchange", function( event ) {
    console.log( "This device is in " + event.orientation + " / " + window.orientation + "° mode!" );
    AdjustSize();
});

$( window ).ready( function() {
    isDevicesMob= detectmob();

    if(isDeviceMob == true){
        ratio = 0.95;
    }
    AdjustSize();
});

$(document).ready(function(){
    var rubik;

    $(window).resize(function(){
        AdjustSize();
        rubik.gridRenderer.Init();
        rubik.gridRenderer.Draw();
    });

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

    function InitRubik(level){
        rubik.Init(level);
        UpdateGUIForNewLevel();
    };

    $('#NextButton').click(function(){InitRubik(rubik.level+1);});
    $('#RepeatButton').click(function(){InitRubik(rubik.level);});
    $('#NextLevelButton').click(function(){InitRubik(rubik.level+1);});
    $('#PreviousLevelButton').click(function(){InitRubik(rubik.level-1);});

    $('#NextButton').on("touchstart",function(){ if(!this.disabled){InitRubik(rubik.level+1);}});
    $('#RepeatButton').on("touchstart",function(){ if(!this.disabled){InitRubik(rubik.level);}});
    $('#NextLevelButton').on("touchstart",function(){ if(!this.disabled){InitRubik(rubik.level+1);}});
    $('#PreviousLevelButton').on("touchstart",function(){ if(!this.disabled){InitRubik(rubik.level-1);}});

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




