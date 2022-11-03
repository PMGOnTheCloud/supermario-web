import Level from './level.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';


export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;

    });
}

export function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
        .then(res => res.json())
        .then(levelSpec => {

            const level = new Level();
            
            const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
            level.comp.layers.push(backgroundLayer);

            const spriteLayer = createSpriteLayer(mario);
            level.comp.layers.push(spriteLayer);

            return level;
        });
}