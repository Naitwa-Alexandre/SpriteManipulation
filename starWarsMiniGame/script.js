const canvas = document.querySelector('#canvas1'); //get canvas element from index.html
const ctx = canvas.getContext('2d'); //this give us access to building canvas methods.
canvas.width = 800; //same as style.css
canvas.height = 500; //same as style.css

const keys = []; //array that contains all keyboard commands.

const player = { //this object store all data about our player character.
    x: 200, //vertical position of player
    y: 200, //horizontal postion of player
    width: 32, //calculate based on spritesheet. width divided per number of sprites horizontally, in this case 4, so 128/4.
    height: 48, //calculate based on spritesheet height divided per number of sprites vertically, in this case 4, so 192/4.
    frameX: 0, // horizontal coordinate of frame we cut out from our spritesheet. Responsable to change frames giving it movement feelings.
    frameY: 0, // vertical coordinate of frame we cut out from our spritesheet. Responsable for the direction the frame is looking at.
    speed: 9, // determinate how many pixels we move per frame of animation.
    moving: false // use to switch between standing and walking animation. 
};

const playerSprite = new Image(); // creates an new image object.
playerSprite.src = 'images/mandalorian2.png'; // path to our spritesheet.
const background = new Image(); //creates an new image object.
background.src = 'images/background.png'; // path to our background.



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){ //this method draw the player image in canvas. check this out https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}




function animate(){ //this function serves to animation loop
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear entire canvas between animation frame loop.
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); //canvas method to draw image in the screen. first argument is the image you wanted to draw, the second and third arguments are coordinates of top left corner to start drawing from. and the last 2 arguments are the width and height of the area we want our image to fit into.
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height); // all player atributes and locations to be drawing in the canvas.
    movePlayer(); //call the function that allows the player movement in canvas.
    requestAnimationFrame(animate); //this command will run this function again and again, creating our animation loop.
}
animate(); //call the function animate to show the content

window.addEventListener('keydown', function(e){ //event listener to keydown event to track the commands
    keys[e.key] = true; //when we press a bottom we add this command to keys array
    console.log(keys);
});

window.addEventListener('keyup', function(e){ //event listener to keydown event to track the commands
    delete keys[e.key]; //when we released a bottom and keyup event occurs we remove that bottom from keys array
    
});

function movePlayer(){
    if (keys['ArrowUp'] && player.y > 100) { //if ArrowUp is true and player in y-axis is more than 100 height then.
        player.y -= player.speed; //move our character in the negative direction along the vertical y-axis.
        player.frameY = 3; // vertical coordinate of frame we cut out from our spritesheet. Responsable for the direction the frame is looking at.
    }
    if (keys['ArrowDown'] && player.y < 450){ //if ArrowDown and player is minus than 400 height then.
        player.y += player.speed; //move our character in the positive direction along the vertical y-axis.
        player.frameY = 0; // vertical coordinate of frame we cut out from our spritesheet. Responsable for the direction the frame is looking at.
    }
    if (keys['ArrowLeft'] && player.x > 0){ //if ArrowLeft is true and player in x-axis is more than 0 width then.
        player.x -= player.speed; //move our character in the negative direction along the horizontal x-axis.
        player.frameY = 1; // vertical coordinate of frame we cut out from our spritesheet. Responsable for the direction the frame is looking at.
    }
    if (keys['ArrowRight'] && player.x < 750){ //if ArrowRight is true and player in x-axis is minus than 700 then.
        player.x += player.speed; //move our character in the positive direction along the horizontal x-axis.
        player.frameY = 2; // vertical coordinate of frame we cut out from our spritesheet. Responsable for the direction the frame is looking at.
    }
}