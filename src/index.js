import Canvas from "./grahpics/canvas.js";
import Init from "./gameController.js";
import Menu from "./ui/menu.js";
import Pause from "./ui/pause.js";
import Level from "./ui/level.js";
import Over from "./ui/over.js";

class Game {
    constructor(canvas, images, data, audios) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.images = images;
        this.data = data;
        this.audios = audios;
        this.init = new Init(this.context, this.images, this.data, this.audios);
        this.menu = new Menu(this.images);
        this.menu.init();
        this.level = new Level(this.images);
        this.level.init();
        this.pause = new Pause(this.images);
        this.pause.init();
        this.over = new Over(this.images);
        this.over.init();
        this.canvasClass = new Canvas(this.context,
                                this.init, this.menu, this.pause,
                                this.level, this.over);
        this.action = 'menu';
        this.maxLock = 200;
        this.levelNumber = parseInt(localStorage.getItem('level') ?? 0);
    }
    onClick() {
        this.canvas.onclick = (e) => {
            switch (this.action) {
                case 'init':
                    if (this.init.getIsActivate()) {
                        if(this.init.createItem(e.offsetX, e.offsetY)){
                            this.init.handlePause();
                            this.action = 'pause';
                        }
                    }
                    break;
                case 'menu':
                    switch (this.menu.event(e)) {
                        case 0:
                            this.action = 'init';
                            break;
                        case 1:
                            this.action = 'level';
                            break;
                    }
                    break;
                case 'pause':
                    switch (this.pause.event(e)) {
                        case 0:
                            this.init.handleContinue();
                            this.action = 'init';
                            break;
                        case 1:
                            this.init.handleClose();
                            this.action = 'menu';
                            break;
                        case -1:
                            this.init.handleReset();
                            this.action = 'init';
                            break;
                    }
                    break;
                case 'level':
                    switch (this.level.event(e)) {
                        case 0:
                            this.levelNumber = 0;
                            localStorage.setItem('level', 0);
                            this.action = 'menu';
                            break;
                        case 1:
                            this.levelNumber = 1;
                            localStorage.setItem('level', 1);
                            this.action = 'menu';
                            break;
                    }
                    break;
                case 'over':
                    switch (this.over.event(e)) {
                        case 1:
                            this.init.handleClose();
                            this.action = 'menu';
                            break;
                        case -1:
                            this.init.handleReset();
                            this.action = 'init';
                            break;
                    }
                    break;
                default:
            }

        }
    }
    eventKey(e) {
        switch (e.keyCode) {
            case 82: // R
                if (this.init.getIsActivate()) {
                    this.init.handleReset();
                }
                break;
            case 27: // Exit
                switch (this.action) {
                    case 'init':
                        if (this.init.getIsActivate()) {
                            this.init.handlePause();
                        }
                        this.action = 'pause';
                        break;
                    case 'menu':
                        break;
                    case 'pause':
                        this.init.handleContinue();
                        this.action = 'init';
                        break;
                    case 'over':
                        this.init.handleClose();
                        this.action = 'menu';
                    case 'level':
                        this.action = 'menu';
                        break;
                    default:
                        break;
                }
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
            case 'pause':
            case 'init':
                if (!this.init.getIsActivate()) {
                    this.init.run(timestamp, this.levelNumber);
                }
                else {
                    this.init.loop(timestamp);
                }
                if (this.init.getCountLock() > this.maxLock) {
                    this.action = 'over';
                    this.audios['game_over'].volume = 0.5;
                    this.audios['game_over'].play();
                    this.init.handlePause();
                }
                break;

        }
    }
    render() {
        this.menu.setLevel(this.levelNumber);
        this.canvasClass.render(this.action);
    }
    loop(timestamp) {
        this.update(timestamp);
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;