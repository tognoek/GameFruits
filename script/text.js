class Text {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
    }
    settext(text) {
        this.text = text;
    }
    getSize(context, font = null) {
        context.font = font || '20px Arial';
        return context.measureText(this.text);
    }
    render(context, font = null, align = null, color = null, images = null, w = 8, h = 10, ratio = 4) {
        // a -> j | k -> t
        if (images != null) {
            for (let index = 0; index < this.text.length; index++) {
                let char = this.text.toLowerCase()[index];
                let ascii = char.charCodeAt(0);
                let x = 0;
                let y = 0;
                if (ascii > 96 && ascii < 107) {
                    x = (ascii - 97) * w;
                    y = 0;
                }
                if (ascii > 106 && ascii < 117) {
                    x = (ascii - 107) * w;
                    y = h;
                }
                if (ascii > 116 && ascii < 123) {
                    x = (ascii - 117) * w;
                    y = 2 * h;
                }
                if (ascii > 47 && ascii < 58){
                    x = (ascii - 48) * w;
                    y = 3 * h;
                }
                if (ascii === 58){
                    x = 2 * w;
                    y = 4 * h;
                }
                if (ascii === 32) {
                    x = 6 * w;
                    y = 2 * h;
                }
                if (ascii === 33) {
                    x = 4 * w;
                    y = 4 * h;
                }
                context.drawImage(images, x, y, w, h,
                    this.x + (index * w * ratio) - (this.text.length * w * 2),
                    this.y, w * ratio, h * ratio);
            }
        }else{
            context.fillStyle = color || 'black';
            context.font = font || '20px Arial';
            context.textAlign = 'start';
            if (align) {
                context.textAlign = align;
            }
            context.fillText(this.text, this.x, this.y);
        }
    }
}

export default Text;