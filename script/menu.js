import Button from "./button.js";
import Text from "./text.js";
class Menu{
    constructor(images){
        this.images = images;
        this.buttons = [];
        this.texts = [];
    }
    init(){
        this.texts.push(new Text(200, 250, 'Purus Game'));
        this.buttons.push(new Button(30, 300, "Start", 0));
    }
    render(context){
        this.buttons.forEach(e => e.render(context, 1));
        this.texts.forEach(e => 
            e.render(context, '50px Arial', 'center')
        );
    }
    event(e){
        let x = e.offsetX;
        let y = e.offsetY;
        let result = null;
        this.buttons.forEach(e => {
            if (e.onClick(x, y)){
                result = e.id;
            }
        });
        return result;
    }

}

export default Menu;