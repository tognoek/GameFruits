import Fruit from './fruit.js';
import Text from "./text.js";

class Init {
    constructor(context = null, images = null, data = null) {
        this.context = context;
        this.fruits = {};
        this.items = [];
        this.images = images;
        this.data = data;
        this.deltaTime = 0;
        this.lastUpdateTime = 0;
        this.name = [];
        this.scores = 0;
        this.isActivate = false;
        this.maxY = 100;
        this.isCreate = false;
        this.nameNext = 'apple';
        this.lastFruit = null;
        this.isPause = false;
        this.background = new Image();
        this.background.src = './Images/background.jpg';
        this.isLoadBackground = false;
        this.countLock = 0;
        this.nameLevel = ['Fruits', 'Cute'];
        this.background.onload = () => {
            this.isLoadbackground = true;
        }
    }
    run(timestamp, level) {
        this.lastUpdateTime = timestamp;
        this.level = level;
        this.name = [];
        this.countLock = 0;
        this.nameFile = this.nameLevel[this.level];
        this.createFruit(() => {
            // call back in fatch
            this.isActivate = true;
            this.isCreate = true;
            this.updateNextName();
        });
        if (this.isCreate) {
            this.isPause = false;
            this.isActivate = true;
        }
    }
    randomName() {
        if (!this.isActivate) {
            console.log('not activated');
            return null;
        }
        return this.name[parseInt(Math.random() * this.name.length)];
    }
    getIsActivate() {
        return this.isActivate;
    }
    handleClose() {
        this.isActivate = false;
        this.items = [];
        this.name = [];
        this.scores = 0;
        this.lastFruit = null;
    }
    handlePause() {
        this.isPause = true;
    }
    handleContinue() {
        this.isPause = false;
    }
    handleReset() {
        this.items = [];
        this.scores = 0;
        this.lastFruit = null;
        this.updateNextName();
        this.isPause = false;
        this.countLock = 0;
    }
    createFruit(callBack) {
        let radiusCanvas = 16;
        let score = 1;
        let row = this.data[this.nameFile].row;
        let col = this.data[this.nameFile].col;
        let w = this.data[this.nameFile].w;
        let h = this.data[this.nameFile].h;
        for (let indexRow = 0; indexRow < row; indexRow++) {
            for (let indexCol = 0; indexCol < col; indexCol++) {
                let x = indexCol * h;
                let y = indexRow * w;
                if (radiusCanvas > 24){
                    radiusCanvas = 23;
                }else{
                    radiusCanvas += 1;
                    score += 1;
                }
                
                let index = indexRow * col + indexCol;
                let name = this.nameFile + index.toString();
                let nameNext = index < (row * col - 1) ? this.nameFile + (index + 1).toString() : null;
                this.name.push(name);
                this.fruits[name] = new Fruit(this.images[this.nameFile], name, x, y,
                    w / 2, h / 2, radiusCanvas,
                    1, 0.6, nameNext, score);
            }
        }
        callBack();
    }
    updateNextName() {
        this.nameNext = this.randomName();
    }
    getScores() {
        return this.scores;
    }
    getCountLock(){
        return this.countLock;
    }
    createItem(x, y, name = null, is = true) {
        if (this.isPause) {
            return;
        }
        if (y > this.maxY && is) {
            return;
        }
        if (this.lastFruit != null && is) {
            return;
        }
        if (name == null) {
            name = this.nameNext;
            this.updateNextName();
        }
        let item = this.fruits[name].copy();
        this.lastFruit = item;
        item.activate(x, y);
        this.items.push(item);
        this.countLock = 0;
    }
    updateTop(){
        let max = parseInt(localStorage.getItem('top') ?? 0);
        if (this.getScores() * (this.level + 1) > max) {
            localStorage.setItem('top', this.getScores() * (this.level + 1));
        }

    }
    renderFruitNext() {
        let fruit = this.fruits[this.nameNext];
        if (fruit) {
            let fruitCopy = fruit.copyDefault();
            fruitCopy.activate(40, 60);
            fruitCopy.render(this.context);
        }
    }
    render() {
        if (this.isLoadbackground) {
            this.context.drawImage(this.background, 0, 0, 400, 700);
        }
        new Text(20, 30, "Scores: " + (this.getScores() * (this.level + 1)))
            .render(this.context, '20px Mono');
        this.updateTop();
        this.renderFruitNext();
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.moveTo(0, this.maxY);
        this.context.lineTo(400, this.maxY);
        this.context.stroke();
        this.items.forEach(item => {
            item.render(this.context);
        })
        if (this.lastFruit != null) {
            if (this.isPause) {
                return;
            }
            this.countLock += 1;
            this.context.strokeStyle = ['red', 'green', 'blue', 'yellow'][Math.floor(Math.random() * 4)];
            this.context.lineWidth = 1;
            this.context.beginPath();
            this.context.arc(40, 60, 20, 0, 2 * Math.PI);
            this.context.stroke();
        }
    }
    update() {
        if (this.isPause) {
            return;
        }
        if (this.lastFruit?.checkOutLine(this.maxY)) {
            this.lastFruit = null;
        }
        this.items.forEach(item => {
            item.update(this.deltaTime / 1000);
        });
        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].isActivate()) {
                for (let indexOther = index + 1; indexOther < this.items.length; indexOther++) {
                    if (this.items[indexOther].isActivate() &&
                        this.items[index].collision(this.items[indexOther])) {
                        this.items[index].die();
                        this.items[indexOther].die();
                        let x = this.items[index].x + this.items[indexOther].x;
                        let y = this.items[index].y + this.items[indexOther].y;
                        this.scores += this.items[index].score;
                        if (this.items[index].nameNext !== null) {
                            this.createItem(x / 2, y / 2, this.items[index].nameNext, false);
                        }
                    }
                }
            }
        }
        let tempItems = this.items.filter((item) => item.isActivate());
        this.items = tempItems;
    }
    loop(timestamp = 0) {
        this.deltaTime = timestamp - this.lastUpdateTime;
        this.lastUpdateTime = timestamp;
        this.update();
    }

}

export default Init;