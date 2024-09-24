import Text from "./ui/components/text.js";
import { handleCollision } from './core/handleCollision.js';
import { handleCreateData } from './gameplay/spawning/handleCreateData.js';
import { handlePlayMusic } from './core/handlePlayMusic.js';
import { handleTween } from "./core/tween/handleTween.js";

class Init {
    constructor(context = null, images = null, data = null, audios = null) {
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
        this.background = this.images['Background']
        this.countLock = 0;
        this.nameLevel = ['Fruits', 'Cute'];
        this.sfx = audios;
        this.yBegin = null;
    }
    run(timestamp, level) {
        this.lastUpdateTime = timestamp;
        this.level = level;
        this.name = [];
        this.countLock = 0;
        this.nameFile = this.nameLevel[this.level];
        const {nameResult, dataResult} = handleCreateData(this.data, this.nameFile, this.images);
        this.name = nameResult;
        this.fruits = dataResult;
        this.isActivate = true;
        this.isCreate = true;
        this.updateNextName();
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
    updateNextName() {
        this.nameNext = this.randomName();
    }
    getScores() {
        return this.scores;
    }
    getCountLock() {
        return this.countLock;
    }
    createItem(x, y, name = null, is = true) {
        if (this.isPause) {
            return false;
        }
        if (x > 350 && x < 350 + 42) {
            if (y > 10 && y < 10 + 44) {
                return true;
            }
        }
        if (y > this.maxY && is) {
            return false;
        }
        if (this.lastFruit != null && is) {
            return false;
        }
        if (name == null) {
            handlePlayMusic(this.sfx, 'short', 0.5, false);
            name = this.nameNext;
            this.updateNextName();
        } else {
            handlePlayMusic(this.sfx, 'collision', 0.5, false);
        }
        let item = this.fruits[name].copy();
        this.lastFruit = item;
        item.activate(x, y);
        this.yBegin = y;
        this.items.push(item);
        this.countLock = 0;
        return false;
    }
    updateTop() {
        let max = parseInt(localStorage.getItem('top') ?? 0);
        if (this.getScores() * (this.level + 1) > max) {
            localStorage.setItem('top', this.getScores() * (this.level + 1));
        }

    }
    renderFruitNext() {
        let fruit = this.fruits[this.nameNext];
        if (fruit) {
            let fruitCopy = fruit.copyDefault();
            let height = handleTween(this.yBegin, this.lastFruit?.y ? this.lastFruit.y : 1000, this.maxY, fruitCopy.getRadiusCanvas() * 2);
            this.countLock += height < fruitCopy.getRadiusCanvas() * 2 ? 1 : 0;
            fruitCopy.activate(40, 60);
            fruitCopy.renderConver(this.context, height);
        }
    }
    render() {
        this.context.drawImage(this.background, 0, 0, 400, 700);
        new Text(170, 20, "Scores: " + (this.getScores() * (this.level + 1)))
            .render(this.context, '20px Mono', null, null, this.images['TextB'], 8, 10, 1.5);
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
        if (!this.isPause) {
            this.context.drawImage(this.images['setting'], 0, 0, 21, 22, 350, 10, 42, 44)
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
                        handleCollision(this.items[index], this.items[indexOther])) {
                        this.items[index].die();
                        this.items[indexOther].die();
                        let x = this.items[index].x + this.items[indexOther].x;
                        let y = this.items[index].y + this.items[indexOther].y;
                        this.scores += this.items[index].score;
                        if (this.items[index].nameNext !== null) {
                            this.createItem(x / 2, y / 2, this.items[index].nameNext, false);
                        } else {
                            handlePlayMusic(this.sfx, 'oi_oi', 0.5, false);
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
        this.deltaTime = Math.min(this.deltaTime, 17);
        this.lastUpdateTime = timestamp;
        this.update();
    }

}

export default Init;