import Text from "./text.js";
class Button{
    constructor(x, y, text, id){
        this.x = x;
        this.y = y;
        this.sizeFont = 50;
        this.text = new Text(this.x + 10, this.y + this.sizeFont - 5, text);
        this.id = id;
        this.font = `${this.sizeFont}px Arial`;
    }
    render(context, is = 0){
        this.sizeText = this.text.getSize(context, this.font);
        context.strokeStyle = 'black';
        if (is == 1){
            this.x = (context.canvas.clientWidth - this.sizeText.width) / 2;
        }
        this.text.x = this.x + 10;
        context.strokeRect(this.x, this.y, this.sizeText.width + 20, this.sizeFont + 10);
        this.text.render(context, this.font);
    }
    onClick(x = null, y = null){
        if (x !== null && x !== null){
            if (x >= this.x && x <= this.x + this.sizeText.width + 20 &&
                y >= this.y && y <= this.y + this.sizeFont  + 10){
                return true;
            }
        }
        return null;
    }
}

export default Button;