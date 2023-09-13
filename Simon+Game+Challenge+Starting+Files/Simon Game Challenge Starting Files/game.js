var blueAudio = new Audio("./sounds/blue.mp3");
var greenAudio = new Audio("./sounds/green.mp3");
var redAudio = new Audio("./sounds/red.mp3");
var yellowAudio = new Audio("./sounds/yellow.mp3");
var wrongAudio = new Audio("./sounds/wrong.mp3");

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColour;
var level = 0;

//random generate from 0 to 3 inclusively
function nextSequence(){
    var num = Math.floor((Math.random() * 4));
    level += 1;
    $("h1").text("Level " + level);
    return num;
}

//flashing animation
function flashButton(buttonElement) {
    $(buttonElement).addClass("pressed");
    setTimeout(function() {
        $(buttonElement).removeClass("pressed");
    }, 100); // Duration of the flash effect, in milliseconds
}
function flashButtonForAI(buttonElement) {
    $(buttonElement).addClass("pressedForAI");
    setTimeout(function() {
        $(buttonElement).removeClass("pressedForAI");
    }, 100);
}
function gameOverFlasing(){
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

//switch function for playing relevent sound
function playSound(color) {
    switch (color) {
        case "blue":
            blueAudio.play();
            break;
        case "green":
            greenAudio.play();
            break;
        case "red":
            redAudio.play();
            break;
        case "yellow":
            yellowAudio.play();
            break;
        default:
            wrongAudio.play();
            break;
    }
}

//checking answer
function checkingAnswer(n1 , n2){
    if (n1 != n2){
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound(wrongAudio);
        gameOverFlasing();
        startOver();
    }
}

function startOver(){
    console.log("Starting over");

    //reset value and array
    gamePattern = [];
    level = 0;
    userClickedPattern = [];

}

//detect when any of the buttons are clicked
//trigger a handler function
//add id to the end of an array
$("div[type='button']").on("click", function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    flashButton(this);
    userClickedPattern.push(userChosenColour);
    var indexOfNewItem = userClickedPattern.length - 1;
    checkingAnswer(userClickedPattern[indexOfNewItem], gamePattern[indexOfNewItem]);
    
    //when user clicks equal to AI but no wrong answer so far, start new game and reset the userClickedPattern array
    if(userClickedPattern.length == gamePattern.length){
        randomNumber = nextSequence();
        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        userClickedPattern = [];

        //select the button with the same id as the randomChosenColour
        var buttonChosen = $("#" + randomChosenColour);
        setTimeout(function(){
            flashButtonForAI(buttonChosen);
            playSound(randomChosenColour);
        }, 1000);
    }
    console.log(userClickedPattern);
});

$(document).one("keydown", function() {
    randomNumber = nextSequence();
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //select the button with the same id as the randomChosenColour
    var buttonChosen = $("#" + randomChosenColour);
    setTimeout(function(){
        flashButtonForAI(buttonChosen);
        playSound(randomChosenColour);
    }, 1000);
});



