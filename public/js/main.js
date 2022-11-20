import Camera from './camera.js';
import Timer from './timer.js';
import { loadLevel } from './loaders/level.js';
import { loadMario } from './entities/mario.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer, createCameraLayer } from './layers.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    loadMario(),
    loadLevel('1-1')
])
.then(([
    createMario,
    level
]) => {

    const camera = new Camera();
    window.camera = camera;
    
    const mario = createMario();
    mario.pos.set(64, 64);

    mario.addTrait({
        NAME: 'hacktrait',
        spawnTimeout: 0,
        obstruct() {

        },
        update(mario, deltaTime) {
            if (this.spawnTimeout > 0.1 && mario.vel.y < 0) {
                const spawn = createMario();
                spawn.pos.x = mario.pos.x;
                spawn.pos.y = mario.pos.y;
                spawn.vel.y = mario.vel.y - 200;
                level.entities.add(spawn);
                this.spawnTimeout = 0;
            }
            this.spawnTimeout += deltaTime;
        }
    });

    level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));

    level.entities.add(mario);
    
    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.draw(context, camera);
    }

    timer.start();
});