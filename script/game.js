import Canvas from "./canvas.js";
import Init from "./init.js";
import Menu from "./menu.js";

class Game {
    constructor(canvas, images) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.images = images;
        this.init = new Init(this.context, this.images);
        this.menu = new Menu(this.context, this.images);
        this.menu.init();
        this.canvasClass = new Canvas(this.context, this.init, this.menu);
        this.action = 'menu';
    }
    onClick() {
        this.canvas.onclick = (e) => {
            switch (this.action) {
                case 'init':
                    if (this.init.getIsActivate()) {
                        this.init.createItem(e.offsetX, e.offsetY);
                    }
                    break;
                case 'menu':
                    switch(this.menu.event(e)){
                        case 0:
                            this.action = 'init';
                            break;
                    }
                    break;
            }

        }
    }
    eventKey(e) {
        switch (e.keyCode) {
            case 82: // R
                if (this.init.getIsActivate()) {
                    this.init.handeleReset();
                }
                break;
            case 27: // Exit
                if (this.init.getIsActivate()) {
                    this.init.handleClose();
                }
                this.action = 'menu';
                break;
            case 80: // P
                if (this.init.getIsActivate()) {
                    this.init.handlePause();
                }
                break;
            case 81: // Q
                if (this.init.getIsActivate()) {
                    this.init.handleContinue();
                }
                break;
        }
    }

    update(timestamp) {
        switch (this.action) {
            case 'init':
                if (!this.init.getIsActivate()) {
                    this.init.run(timestamp);
                }
                else{
                    this.init.loop(timestamp);
                }
                break;
        }
    }
    render() {
        this.canvasClass.render(this.action);
    }
    loop(timestamp) {
        this.update(timestamp);
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;