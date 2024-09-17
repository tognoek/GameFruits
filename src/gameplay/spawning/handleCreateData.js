import Fruit from "../object/fruit.js";
export const handleCreateData = (datas = null, nameFile = null, images = null) => {
    if (datas && nameFile && images) {
        let nameResult = [];
        let dataResult = {};
        let radiusCanvas = 16;
        let score = 1;
        let row = datas[nameFile].row;
        let col = datas[nameFile].col;
        let w = datas[nameFile].w;
        let h = datas[nameFile].h;
        for (let indexRow = 0; indexRow < row; indexRow++) {
            for (let indexCol = 0; indexCol < col; indexCol++) {
                let x = indexCol * h;
                let y = indexRow * w;
                if (radiusCanvas > 24) {
                    radiusCanvas = 23;
                } else {
                    radiusCanvas += 1;
                    score += 1;
                }

                let index = indexRow * col + indexCol;
                let name = nameFile + index.toString();
                let nameNext = index < (row * col - 1) ? nameFile + (index + 1).toString() : null;
                nameResult.push(name);
                dataResult[name] = new Fruit(images[nameFile], name, x, y,
                    w / 2, h / 2, radiusCanvas,
                    1, 0.6, nameNext, score);
            }
        }
        return { nameResult, dataResult };
    }else{
        throw new Error("datas is null or name is null or images is null");
    }
    return { nameResult : null, dataResult : null};
};
