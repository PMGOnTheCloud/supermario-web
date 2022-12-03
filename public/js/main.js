import Camera from './camera.js';
import Timer from './timer.js';
import Entity from './entity.js';
import PlayerController from './traits/playercontroller.js';
import { createLevelLoader } from './loaders/level.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer, createCameraLayer } from './layers.js';
import { loadEntities } from './entities.js';


function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas) {
    const context = canvas.getContext('2d');
    
    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);
    
    const level = await loadLevel('1-1');

    const camera = new Camera();
    window.camera = camera;
    
    const mario = entityFactory.mario();
    mario.pos.set(64, 64);
    
    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);


    /*
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
    */

    level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));

    level.entities.add(mario);
    
    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (mario.pos.x > 100) {
            camera.pos.x = Math.max(0, mario.pos.x - 100);
        }

        level.comp.draw(context, camera);
    }

    timer.start();
};

const canvas = document.getElementById('screen');
main(canvas);