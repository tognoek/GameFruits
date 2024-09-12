import Fruit from './fruit.js';
class Init {
    constructor(context = null, images = null) {
        this.context = context;
        this.fruits = {};
        this.items = [];
        this.images = images;
        this.deltaTime = 0;
        this.lastUpdateTime = 0;
        this.name = [];
        this.scores = 0;
        this.isActivate = false;
        this.maxY = 100;
        this.nameNext = 'apple';
        this.lastFruit = null;
        this.isPause = false;
    }
    run(timestamp) {
        this.lastUpdateTime = timestamp;
        this.createFruit(() =>{
            // call back in fatch
            this.isActivate = true;
            this.updateNextName();
        });
    }
    randomName(){
        if (!this.isActivate){
            console.log('not activated');
            return null;
        }
        return this.name[parseInt(Math.random() * this.name.length)];
    }
    getIsActivate(){
        return this.isActivate;
    }
    handleClose(){
        this.isActivate = false;
        this.items = [];
        this.scores = 0;
        this.lastFruit = null;
    }
    handlePause(){
        this.isPause = true;
    }
    handleContinue(){
        this.isPause = false;
    }
    handeleReset(){
        this.items = [];
        this.scores = 0;
        this.lastFruit = null;
        this.updateNextName();
    }
    async createFruit(callBack) {
        await fetch('./data/fruits.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('File error!!!');
                }
                return response.json();
            })
            .then(data => {
                let radiusCanvas = 14;
                let score = 1;
                for (let fruit in data) {
                    this.name.push(fruit);
                    let dataMini = data[fruit];
                    this.fruits[fruit] = new Fruit(this.images, fruit, dataMini.x, dataMini.y,
                        dataMini.radiusImage, radiusCanvas += 2,
                        dataMini.mass, dataMini.restitution, dataMini.next, score++);
                }
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            });
            callBack();
    }
    updateNextName(){
        this.nameNext = this.randomName();
    }
    getScores(){
        return this.scores;
    }
    createItem(x, y, name = null) {
        if (this.isPause){
            return;
        }
        if (y > this.maxY){
            return;
        }
        if (this.lastFruit != null) {
            return;
        }
        if (name == null){
            name = this.nameNext;
            this.updateNextName();
        }
        let item = this.fruits[name].copy();
        this.lastFruit = item;
        item.activate(x, y);
        this.items.push(item);
    }
    renderFruitNext(){
        let fruit = this.fruits[this.nameNext];
        if (fruit){
            let fruitCopy = fruit.copyDefault();
            fruitCopy.activate(30, 50);
            fruitCopy.render(this.context);
        }
    } 
    render() {
        this.renderFruitNext();
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.moveTo(0, this.maxY);
        this.context.lineTo(400, this.maxY);
        this.context.stroke();
        this.items.forEach(item => {
            item.render(this.context);
        })
        if (this.lastFruit != null){
            if (this.isPause){
                return;
            }
            this.context.strokeStyle = ['red', 'green', 'blue', 'yellow'][Math.floor(Math.random() * 4)];
            this.context.lineWidth = 2;
            this.context.beginPath();
            this.context.arc(30, 50, 24, 0, 2 * Math.PI);
            this.context.stroke();
        }

    }
    update() {
        if (this.isPause){
            return;
        }
        if (this.lastFruit?.checkOutLine(this.maxY)){
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
                        if (this.items[index].nameNext !== null){
                            this.createItem(x / 2, y / 2, this.items[index].nameNext);
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