class Fruit{
    // Is cricle
    constructor(images, name, sx, sy, rImage, rCanvas, mass, restitution, nameNext, score){
        this.images = images
        this.name = name;
        this.sx = sx;
        this.sy = sy;
        this.rImage = rImage;
        this.rCanvas = rCanvas;
        this.vx = 0;
        this.vy = 30;
        this.g = 98;
        this.mass = mass;
        this.restitution = restitution;
        this.radius = rCanvas;
        this.vectorY = -1;
        this.isReverse = true;
        this.isAction = true;
        this.nameNext = nameNext;
        this.score = score;
    }
    activate(x, y){
        this.x = x;
        this.y = y;
    }
    checkOutLine(y = 150){
        if (!this.isActivate()){
            return true;
        }
        if (this.y - this.radius > y){
            return true;
        }
        return false;
    }
    isActivate(){
        if (!this.x || !this.y) {
            return false;
        }
        if (!this.isAction){
            return false;
        }
        return true;
    }
    update(deltaTime, max = {x : 400, y : 700}){
        if (!this.isActivate()) {
            return;
        }
        // update speed x of fruit
        this.vy += deltaTime * this.g;
        // update coordinates of a fruit
        this.x += this.vx * deltaTime;
        if (Math.abs(this.vy * deltaTime) > 0.1){
            this.y += this.vy * deltaTime;
        }
        if (this.y + this.radius > max.y){
            this.vy = this.vy * -1 * this.restitution;
            this.y = max.y - this.radius;
        }
        if (this.x - this.radius < 0){
            this.vx = this.vx * -1;
            this.x = this.radius;
        }
        if (this.x + this.radius > max.x){
            this.vx = this.vx * -1;
            this.x = max.x - this.radius;
        }
    }
    moving(speed, object, implues, dis){
        if (speed < 0){
            return;
        }
        let mass = object.mass;
        this.vx += dis  * (implues * mass * this.vCollisionNorm.x);
        this.vy += dis  * (implues * mass * this.vCollisionNorm.y);
    }
    die(){
        this.isAction = false;
    }
    collision(object){
        if (!this.isActivate()) {
            return;
        }
        let delatX = object.x - this.x;
        let delatY = object.y - this.y;
        let distance = Math.sqrt(delatX * delatX + delatY * delatY);
        if (distance < this.radius + object.radius){
            this.vCollisionNorm = {x : delatX / distance, y : delatY / distance};
            object.vCollisionNorm = {x : delatX / distance, y : delatY / distance};
            let vRelativeVelocity = {
                x: this.vx - object.vx,
                y: this.vy - object.vy
            }
            let speed = this.vCollisionNorm.x * vRelativeVelocity.x + this.vCollisionNorm.y * vRelativeVelocity.y;
            let implues = 2 * speed / (this.mass + object.mass);
            this.moving(speed, object, implues, -1);
            object.moving(speed, this, implues, 1);
            return this.name === object.name;
        }
        return false;
    }
    render(context){
        if (!this.isActivate()) {
            return;
        }
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(this.images, this.sx, this.sy,
                         this.rImage * 2, this.rImage * 2,
                         this.x - this.rCanvas, this.y - this.rCanvas,
                         this.rCanvas * 2, this.rCanvas * 2);
        // context.beginPath();
        // context.arc(this.x , this.y , this.radius, 0, 2 * Math.PI);
        // context.stroke();
        // context.closePath();
    }
    copy(){
        return new Fruit(this.images, this.name, 
                        this.sx, this.sy, this.rImage, 
                        this.rCanvas, this.mass, this.restitution,
                        this.nameNext, this.score);
    }
    copyDefault(){
        return new Fruit(this.images, this.name, 
                        this.sx, this.sy, this.rImage, 
                        this.rImage, this.mass, this.restitution,
                        this.nameNext, this.score);
    }
}

export default Fruit; 