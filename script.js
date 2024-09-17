// Import class
import Game from './src/main.js';
import Images from './src/utils/image.js';

const canvas = document.getElementById('canvas');
const images = [{ name: 'Fruits', src: './assets/Images/Fruits.png' },
{ name: 'Chirstmas', src: './assets/Images/Chirstmas.png' },
{ name: 'Cute', src: './assets/Images/Cute.png' },
{ name: 'Background', src: './assets/Images/background.jpg' },
{ name: 'Logo', src: './assets/Images/logo.svg' },
{ name: 'TextB', src: './assets/Images/text_black.png' },
{ name: 'TextW', src: './assets/Images/text_white.png' },
{ name: 'setting', src: './assets/Images/setting.png' }]
const aduios = {
    'collision': new Audio('./assets/Music/collision.wav'),
    'short': new Audio('./assets/Music/short.wav'),
    'oi_oi': new Audio('./assets/Music/oi_oi.wav'),
    'game_over' : new Audio('./assets/Music/game_over_robot.mp3')
}

// Music
let audio = new Audio('./assets/Music/cute.mp3');
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