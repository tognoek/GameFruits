class Text{
    constructor(x, y, text){
        this.x = x;
        this.y = y;
        this.text = text;
    }
    settext(text){
        this.text = text;
    }
    getSize(context, font = null){
        context.font =  font ||'20px Arial';
        return context.measureText(this.text);
    }
    render(context, font = null, align = null, color = null){
        context.fillStyle = color || 'black';
        context.font = font || '20px Arial';
        context.textAlign = 'start';
        if (align){
            context.textAlign = align;
        }
        context.fillText(this.text, this.x, this.y);
    }
}

export default Text;