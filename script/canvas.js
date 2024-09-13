
class Canvas {
    constructor(context, init, menu, pause, level, over) {
        this.context = context;
        this.text = [];
        this.init = init;
        this.menu = menu;
        this.pause = pause;
        this.level = level;
        this.over = over;
    }
    gamePause(){
        this.init.render();
        this.pause.render(this.context);
    }
    gameOver(){
        this.init.render();
        this.over.render(this.context);
    }

    render(action) {
        this.context.clearRect(0, 0, 400, 700);
        switch (action) {
            case 'init':
                if (this.init.getIsActivate()) {
                    this.init.render();
                }
                break;
            case 'menu':
                this.menu.render(this.context);
                break;
            case 'pause':
                this.gamePause();
                break;
            case 'level':
                this.level.render(this.context);
                break;
            case 'over':
                this.gameOver();
                break;
            default:
                break;
        }
    }
}

export default Canvas;