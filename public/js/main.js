import Compositor from './compositor.js';
import Timer from './timer.js';
import KeyboardState from './keyboard.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites } from './sprites.js';
import { createMario } from './entities.js';






const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(([
    mario,
    backgroundSprites,
    level
]) => {
        
    const gravity = 2000;
    mario.pos.set(64, 180);

    const SPACE = 32;
    const input = new KeyboardState();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    input.listenTo(window);


    


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        mario.update(deltaTime);
        comp.draw(context);
        mario.vel.y += gravity * deltaTime;
    }

    timer.start();
});