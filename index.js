const gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"]
const usersPattern = [];
var level = 0;
let keyPress = false;
$(document).on("keydown",function(){
    if(!keyPress){
        $("h1").html("level "+level)
        nextSequence();
        keyPress = true;
    }
    });

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    usersPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(usersPattern.length-1);
    
})

function nextSequence(){
    var randomNumber = Math.floor((Math.random()*4))
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
   
    // console.log(gamePattern)
}

function playSound(event){
    var audio = new Audio("sounds/"+event+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(()=>$("#"+currentColour).removeClass("pressed"),100);
}

function checkAnswer(currentLevel){
    if(usersPattern[currentLevel] === gamePattern[currentLevel]){
        if(usersPattern.length === gamePattern.length){
            if(JSON.stringify(usersPattern)===JSON.stringify(gamePattern)){
                setTimeout(function(){
                    nextSequence();
                    usersPattern.length = 0;
                    level++;
                    $("h1").html("level "+level)
                },1000)
        }
    }
    }else{
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(()=>$("body").removeClass("game-over"),100)
       $("h1").html("Game over press any key to restart"); 
       $(document).keydown(startOver())
    }
}

function startOver(){
    gamePattern.length = 0;
    usersPattern.length = 0;
    level = 0;
    $("h1").html("Press any key to start");
    keyPress = false;
}

//     switch (event) {
//         case "green":
//             var green = new Audio("sounds/green.mp3");
//             green.play(); 
//             break;
//         case "red":
//             var red = new Audio("sounds/red.mp3");
//             red.play(); 
//             break;
//         case "yellow":
//             var yellow = new Audio("sounds/yellow.mp3");
//             yellow.play(); 
//             break;
//         case "blue":
//             var blue = new Audio("sounds/blue.mp3");
//             blue.play(); 
//             break;
//         default:console.log(event);
//             break;
//     }