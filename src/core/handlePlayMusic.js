export const handlePlayMusic = (datas = null, name = null, volume = 0.1, loop = false) => {
    if (datas && name){
        datas[name].volume = volume;
        datas[name].loop = loop;
        datas[name].play();
    }else{
        throw new Error("datas is null or name is null");
    }
};
