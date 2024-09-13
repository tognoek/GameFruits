import Button from "./button.js";
import Text from "./text.js";
class Menu {
    constructor(images) {
        this.images = images;
        this.buttons = [];
        this.texts = [];
        this.isLoadLogo = false;
        this.nameLevel = ["Level I", "Level II"];
    }
    setLevel(level) {
        this.level = level;
    }
    init() {
        this.image = this.images['Logo']
        this.texts.push(new Text(200, 280, 'Togn Oek'));
        this.buttons.push(new Button(30, 350, "Start", 0));
        this.buttons.push(new Button(30, 450, "Start", 1));
    }
    render(context) {
        context.drawImage(this.image, 100, 50);
        this.buttons.forEach(e => {
            if (e.id == 1){
                e.setText(this.nameLevel[this.level]);
            }
            e.render(context, 1, this.images)
        });
        this.texts.forEach(e =>
            e.render(context, '50px Arial', 'center', null, this.images['TextB'])
        );
        new Text(200, 600, 'Top: ' + (localStorage.getItem('top') ?? 0)).render(context, '40px Arial', 'center', null, this.images['TextB']);
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

export default Menu;