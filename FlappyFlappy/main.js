const canvas  = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;



let spacePressed = false; //command with space slips between true/false
let angle = 0; //make our bird move slighly up and down
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2; //to move background and bird or multiplies players

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'images/BG.png';

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground(){
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    handleObstacles(); //insert the obstacles
    bird.update(); //updates of the class BIRD created at bird.js
    bird.draw(); //shape of our bird class BIRD.
    handleParticles(); //insert articles
    ctx.fillStyle = gradient;
    ctx.font = '50px Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    if (handleCollision()) return;
    angle += 0.15;
    hue++;
    frame++;
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('keydown', function(e){ //listener to track all keyboards down, in this case, SPACE
    if (e.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', function(e){ //listener to track all keyboards up, i nthis case SPACE to set it to false;
    if (e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
});

const bang = new Image();
bang.src = 'images/bang.png'
function handleCollision(){
    for (let i = 0; i < obstacleArray.length; i++){
        if (bird.x < obstacleArray[i].x + obstacleArray[i].width &&
            bird.x + bird.width > obstacleArray[i].x && 
            ((bird.y < 0 + obstacleArray[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstacleArray[i].bot &&
            bird.y + bird.height < canvas.height))){
                //collision detected
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                ctx.font = '30px Georgia';
                ctx.fillStyle = 'white';
                ctx.fillText('Game Over , your score is ' + score, 160, canvas.height / 2 - 10);

                return true;
            }
    }
}

