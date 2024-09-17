class Images {
    constructor(list = []) {
        this.list = list;
        this.count = 0;
        this.result = [];
    }
    check() {
        return this.count === this.list.length;
    }
    handleLoad(callback) {
        this.list.forEach(image => {
            let img = new Image();
            img.src = image.src;
            img.onload = () => {
                this.count++;
                this.result[image.name] = img;
                if (this.check()) {
                    callback();
                }
            }
        });
    }
    getImages(){
        return this.result;
    }
}

export default Images;
