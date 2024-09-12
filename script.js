// Import class
import Game from './script/game.js';

const canvas = document.getElementById('canvas');
let game;
let image = new Image()
image.src = './Image/Fruits.png'
image.onload = () => {
    run();
}
window.addEventListener('keydown', (e) => {
    game.eventKey(e);
});
function run(){
    game = new Game(canvas, image);
    game.onClick();
    requestAnimationFrame(game.loop.bind(game));
}