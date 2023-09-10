var buttonList = document.querySelectorAll(".drum");
var crash = new Audio("./sounds/crash.mp3");
var kickBass = new Audio("./sounds/kick-bass.mp3");
var snare = new Audio("./sounds/snare.mp3");
var tom1 = new Audio("./sounds/tom-1.mp3");
var tom2 = new Audio("./sounds/tom-2.mp3");
var tom3 = new Audio("./sounds/tom-3.mp3");
var tom4 = new Audio("./sounds/tom-4.mp3");


//add eventListener for each btn
for (var i = 0; i < buttonList.length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function (){
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);

        buttonAnimation(buttonInnerHTML);
    });
}

//add eventListener to all document but only call the callback function when the typeOfEvent is match up, in this case "keydown" key on keyboard
document.addEventListener("keydown", function(event){
    makeSound(event.key);

    buttonAnimation(event.key);
})


function makeSound(key){
    switch (key){
        case "w":
            
            crash.play();
            break;
        case "a":
            
            kickBass.play();
            break;
        case "s":
            
            snare.play();
            break;
        case "d":
            
            tom1.play();
            break;
        case "j":
            
            tom2.play();
            break;
        case "k":  
            
            tom3.play();
            break; 
        case "l": 
            
            tom4.play();
            break;
        default: console.log(buttonInnerHTML);
    }
}

function buttonAnimation(currentKey){
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.toggle("pressed");
    setTimeout(function(){
        activeButton.classList.toggle("pressed");
    }, 200);
}