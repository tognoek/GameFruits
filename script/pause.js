import Button from "./button.js";
import Text from "./text.js";
class Pause{
    constructor(images){
        this.images = images;
        this.buttons = [];
        this.texts = [];
    }
    init(){
        this.texts.push(new Text(200, 150, 'Togn Oek'));
        this.buttons.push(new Button(30, 250, "Continue", 0));
        this.buttons.push(new Button(30, 350, "Reset", -1));
        this.buttons.push(new Button(30, 450, "Exit", 1));
    }
    render(context){
        context.fillStyle = 'rgba(128, 128, 128, 0.5)';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        this.buttons.forEach(e => e.render(context, 1, this.images));
        this.texts.forEach(e => 
            e.render(context, '50px Arial', 'center', '#3C3D37', this.images['TextB'])
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

export default Pause;