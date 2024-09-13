import Button from "./button.js";
import Text from "./text.js";
class Level {
    constructor() {
        this.buttons = [];
        this.texts = [];
        this.isLoadLogo = false;
    }
    init() {
        this.image = new Image();
        this.image.src = './../Images/logo.svg';
        this.image.onload = () => {
            this.isLoadLogo = true;
        }
        this.texts.push(new Text(200, 300, 'Purus Game'));
        this.buttons.push(new Button(30, 350, "Level I", 0));
        this.buttons.push(new Button(30, 450, "Level II", 1));
    }
    render(context) {
        if (this.isLoadLogo){
            context.drawImage(this.image, 100, 50);
        }
        this.buttons.forEach(e => e.render(context, 1));
        this.texts.forEach(e =>
            e.render(context, '50px Arial', 'center')
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