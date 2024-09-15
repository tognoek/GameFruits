// Import class
import Game from './script/game.js';
import Images from './script/image.js';

const canvas = document.getElementById('canvas');
const images = [{ name: 'Fruits', src: './Images/Fruits.png' },
{ name: 'Chirstmas', src: './Images/Chirstmas.png' },
{ name: 'Cute', src: './Images/Cute.png' },
{ name: 'Background', src: './Images/background.jpg' },
{ name: 'Logo', src: './Images/logo.svg' },
{ name: 'TextB', src: './Images/text_black.png' },
{ name: 'TextW', src: './Images/text_white.png' },
{ name: 'setting', src: './Images/setting.png' }]
const aduios = {
    'collision': new Audio('./Music/collision.wav'),
    'short': new Audio('./Music/short.wav'),
    'oi_oi': new Audio('./Music/oi_oi.wav'),
    'game_over' : new Audio('./Music/game_over_robot.mp3')
}

// Music
let audio = new Audio('./Music/cute.mp3');
audio.loop = true;
audio.volume = 0.1;
canvas.addEventListener('click', function () {
    audio.play().catch(function (error) {
        console.log('Error playing audio:', error);
    });
}, { once: true });
const imageItem = new Images(images);

const callback = () => {
    fetch('./data/fruits.json')
        .then((response) => response.json())
        .then(datas => {
            const game = new Game(canvas, imageItem.getImages(), datas, aduios);
            game.onClick();
            requestAnimationFrame(game.loop.bind(game));
            window.addEventListener('keydown', (e) => {
                game.eventKey(e);
            });
        })
}
imageItem.handleLoad(callback);