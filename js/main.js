const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;


let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;


//Importar imagen
const background = new Image();
background.src = 'Assets/Sprites/WinterTileset/png/BG/BG.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}




function handleBackground(){
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed;
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else (BG.x2 -= gamespeed);
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}


//Animaciones
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* ctx.fillRect(10, temp - 90, 50, 50); */
    handleBackground();
    handleObstacles();
    handleParticles();
    audio.startMusic();
    bird.update();
    bird.draw();
    
    ctx.fillStyle = "#000";
    ctx.font = '50px Poppins';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if (handleCollisions()) return;
    requestAnimationFrame(animate);
    angle+=0.13;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown', function(e){
    if (e.code === "Space") spacePressed = true;
    audio.flip();
});

window.addEventListener('keyup', function(e){
    if (e.code === "Space") spacePressed = false;
});

const bang = new Image();
bang.src = 'Assets/Imagenes/bang.png';

function handleCollisions(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x && 
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
                bird.y + bird.height < canvas.height))){
                    ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                    audio.gameOver();
                    ctx.font = "25px Poppins";
                    ctx.fillStyle = "white";
                    ctx.fillText('Juego Terminado,  Puntuación: ' + score, 160, canvas.height/2-10);
                    return true;
                }
    }
} 

