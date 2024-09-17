export const handleTween = (start, now, end, height) => {
    let deltaTime = now - start;
    let progress = deltaTime / end;
    if (progress > 1) {
        progress = 1;
    }
    return height * progress;
};
