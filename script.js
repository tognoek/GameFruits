// Import class
import Game from './script/game.js';
import Images from './script/image.js';

const canvas = document.getElementById('canvas');
const images = [{ name: 'Fruits', src: './Images/Fruits.png' },
                { name: 'Chirstmas', src: './Images/Chirstmas.png' },
                { name: 'Cute', src: './Images/Cute.png' }]

const imageItem = new Images(images);

const callback = () => {
    fetch('./data/fruits.json')
        .then((response) => response.json())
        .then(datas => {
            const game = new Game(canvas, imageItem.getImages(), datas);
            game.onClick();
            requestAnimationFrame(game.loop.bind(game));
            window.addEventListener('keydown', (e) => {
                game.eventKey(e);
            });
        })
    }
imageItem.handleLoad(callback);