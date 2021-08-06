const pajaroSprite = new Image();
pajaroSprite.src = 'Assets/Sprites/Boxbird/png/skeleton-animation_00.png';

class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originalWidth = 269;
        this.originalHeight = 156;
        this.width = this.originalWidth /6;
        this.height = this.originalHeight /6;
        this.weight = 1;
        
    }
    update(){
        let curve = Math.sin(angle) * 20;

        if (this.y > canvas.height - (this.height * 3) + curve){
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
            
        }
        if (this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }
    draw(){
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(pajaroSprite, 0, 0, this.originalWidth, this.originalHeight, this.x -7 , this.y -8, this.width*1.3, this.height*1.3);

    }
    flap(){
        this.vy -= 2;
    }
}
 
const bird = new Bird();