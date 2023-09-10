var buttonList = document.querySelectorAll(".drum");
var audio = new Audio("./sounds/tom-1.mp3");

for (var i = 0; i < buttonList.length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function (){
        this.style.color = "white";
    });
}

