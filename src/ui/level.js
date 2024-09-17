import Button from "./components/button.js";
import Text from "./components/text.js";
class Level {
    constructor(images) {
        this.images = images;
        this.buttons = [];
        this.texts = [];
        this.isLoadLogo = false;
    }
    init() {
        this.image = this.images['Logo'];
        this.texts.push(new Text(200, 280, 'Togn Oek'));
        this.buttons.push(new Button(30, 350, "Level I", 0));
        this.buttons.push(new Button(30, 450, "Level II", 1));
    }
    render(context) {
        context.drawImage(this.image, 100, 50);
        this.buttons.forEach(e => e.render(context, 1, this.images));
        this.texts.forEach(e =>
            e.render(context, '50px Arial', 'center', null, this.images['TextB'])
        );
    }
    event(e) {
        let x = e.offsetX;
        let y = e.offsetY;
        let result = null;
        this.buttons.forEach(e => {
            if (e.onClick(x, y)) {
                result = e.id;
            }
        });
        return result;
    }

}

export default Level;