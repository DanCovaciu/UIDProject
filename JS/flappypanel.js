//initialize canvas and context
var main = document.getElementById("main");
var gameover = document.getElementById("game-over");

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//load images
var panel = new Image();
var background = new Image();
var foreground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

var gameLogo = new Image();
var newGame = new Image();
var leaderboard = new Image();
var gamesettings = new Image();

panel.src="images/panelImage.png";
pipeNorth.src="images/pipeUp.png";
pipeSouth.src="images/pipeDown.png";
background.src="images/gameBackground.jpg";
foreground.src="images/gameForeground.png";

var gap = 400;
var cst = pipeNorth.height+gap;

var sunX = 10;
var sunY = 10;

var gravity = 1.8;

var pipe = [];
var stop = false;

pipe[0] = {
    x: canvas.width,
    y: 0
}

// draw the images

document.addEventListener("click",moveUp);

function moveUp(){
    sunY-=40;
}

function drawImages(){
    if (stop == false){
    context.drawImage(background,0,0);
    for (var i = 0;i<pipe.length;i++)
    {
        context.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        context.drawImage(pipeSouth,pipe[i].x,pipe[i].y + cst);

        pipe[i].x--;

        if (pipe[i].x == 250)
        {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if (sunY + panel.height >= canvas.height - foreground.height){
            gameOver();
        }
        if (sunX + panel.width >= pipe[i].x && sunX <= pipe[i].x + pipeNorth.width && (sunY<=pipe[i].y + pipeNorth.height ||
            sunY+panel.height >= pipe[i].y+cst)){
            gameOver();
        }
    }

    context.drawImage(foreground,0,412);

    context.drawImage(panel,sunX,sunY);

    sunY+=gravity;
    

    requestAnimationFrame(drawImages);
    }
}


function redrawsun(){
    var sunX = 10;
    var sunY = 10;
}

function hide(el){
    el.style.display = 'none';
}

function show(el){
    el.style.display = 'block';
}

function mainMenu(){
    show(main);
}

function gameOver(){
    stop = true;
    show(gameover);
}

document.addEventListener("DOMContentLoaded", function(){
    mainMenu();
});

document.querySelectorAll('.play')[0].addEventListener('click', function() {
    hide(main);
    drawImages();
});

document.querySelectorAll('.restart')[0].addEventListener('click', function() {
    hide(gameover);
    stop = false;
    location.reload();
    drawImages();
});

//drawImages();

//requestAnimationFrame(drawImages);
//window.onload=requestAnimationFrame(drawImages);