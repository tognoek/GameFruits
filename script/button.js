import Text from "./text.js";
class Button{
    constructor(x, y, text, id){
        this.x = x;
        this.y = y;
        this.sizeFont = 50;
        this.px = 20;
        this.py = 10;
        this.text = new Text(this.x + this.px, this.y + this.sizeFont, text);
        this.id = id;
        this.font = `${this.sizeFont}px Arial`;
    }
    setText(text){
        this.text.settext(text);
    }
    render(context, is = 0){
        this.sizeText = this.text.getSize(context, this.font);
        context.strokeStyle = 'black';
        if (is == 1){
            this.x = (context.canvas.width - 200) / 2 - 20;
        }
        this.text.x = this.x + this.px + 100;
        this.drawRoundedRect(context,
                            this.x, this.y,
                            200 + this.px * 2, this.sizeFont + this.py * 2,
                            10);
        this.text.render(context, this.font, 'center', 'white');
    }
    onClick(x = null, y = null){
        if (x !== null && x !== null){
            if (x >= this.x && x <= this.x + 200 + this.px * 2 &&
                y >= this.y && y <= this.y + this.sizeFont  + this.py * 2){
                return true;
            }
        }
        return null;
    }
    drawRoundedRect(context, x, y, width, height, radius) {
        // make by chat gpt
        context.beginPath();
        context.moveTo(x + radius, y); // Bắt đầu từ góc trên bên trái (bo góc)
        context.lineTo(x + width - radius, y); // Vẽ cạnh trên
        context.quadraticCurveTo(x + width, y, x + width, y + radius); // Bo góc trên bên phải
        context.lineTo(x + width, y + height - radius); // Vẽ cạnh phải
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // Bo góc dưới bên phải
        context.lineTo(x + radius, y + height); // Vẽ cạnh dưới
        context.quadraticCurveTo(x, y + height, x, y + height - radius); // Bo góc dưới bên trái
        context.lineTo(x, y + radius); // Vẽ cạnh trái
        context.quadraticCurveTo(x, y, x + radius, y); // Bo góc trên bên trái
        context.closePath();
        
        // Tô màu (nếu cần)
        context.fillStyle = 'gray'; // Màu của hình chữ nhật
        context.fill();
        
        // Vẽ đường viền (nếu cần)
        context.strokeStyle = 'black'; // Màu viền
        context.stroke();
    }
}

export default Button;