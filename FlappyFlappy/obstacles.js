const obstacleArray = [];

const obstacle = new Image();
obstacle.src = 'images/tree.png';
const obstacle2 = new Image();
obstacle2.src = 'images/tree2.png';

class Obstacle { //Pipes and obstacles.
    constructor(){
        this.top = (Math.random() * canvas.height / 2) + 20; // Top Pipes
        this.bot = (Math.random() * canvas.height / 2) + 20; // Bottom Pipes
        this.x = canvas.width;
        this.width = 20;
        this.color = 'hsla(' + hue + ', 100%, 50%, 1)';
        this.counted = false;
    }
    draw(){
        ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, 0, this.width * 3, this.top); //top pipe
        ctx.drawImage(obstacle2, this.x, 0, this.width * 3, this.top);
        //ctx.fillRect(this.x, canvas.height - this.bot, this.width * 3, this.bot); //bot pipe
        ctx.drawImage(obstacle, this.x, canvas.height - this.bot, this.width * 3, this.bot);

    }
    upgrade(){
        this.x -= gameSpeed;
        if(!this.counted && this.x < bird.x){
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles(){
    if (frame % 150 === 0){ // change range of obstacles 
        obstacleArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstacleArray.length; i++){
        obstacleArray[i].upgrade();
    }
    if (obstacleArray.length > 20){
        obstacleArray.pop(obstacleArray[0]);
    }
}
