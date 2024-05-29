var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

//Play sound
function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}


$(document).keypress(function() {
    if (!gameStart){
        $("#level-title").text("Level" + level);
        nextSequence();
        gameStart = true;
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence()
            },1000);
        }
    }
    else {
        gameOver();
        startOver();
    }
}

function gameOver() {
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200)
    $("h1").text("Game Over, Press Any key to restart");
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = false;
}
