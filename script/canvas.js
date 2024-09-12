import Text from "./text.js";

class Canvas {
    constructor(context, init, menu) {
        this.context = context;
        this.text = [];
        this.init = init;
        this.menu = menu;
    }

    gamePlay() {
        this.init.render();
        let text = new Text(20, 20, "Scores: " + this.init.getScores());
        text.render(this.context);
    }

    gameMenu() {
        this.menu.render(this.context);
    }

    render(action) {
        this.context.clearRect(0, 0, 400, 700);
        switch (action) {
            case 'init':
                if (this.init.getIsActivate()) {
                    this.gamePlay();
                }
                break;
            case 'menu':
                this.gameMenu();
                break;
            default:
                break;
        }
    }
}

export default Canvas;