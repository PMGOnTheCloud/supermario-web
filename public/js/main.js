import Camera from './camera.js';
import Timer from './timer.js';
import { createLevelLoader } from './loaders/level.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer } from './layers/collision.js';
import { createCameraLayer } from './layers/camera.js';
import { createDashboardLayer } from './layers/dashboard.js';
import { loadEntities } from './entities.js';
import { loadFont } from './loaders/font.js';
import { createPlayerEnv, createPlayer } from './player.js';

async function main(canvas) {
    const context = canvas.getContext('2d');
    const audioContext = new AudioContext();
    
    const [entityFactory, font] = await Promise.all([
        loadEntities(audioContext),
        loadFont()
    ]);

    const loadLevel = await createLevelLoader(entityFactory);
    
    const level = await loadLevel('1-1');

    const camera = new Camera();
    
    const mario = createPlayer(entityFactory.mario());

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);
    
    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font, playerEnv));
    
    const input = setupKeyboard(mario);
    input.listenTo(window);

    const gameContext = {
        audioContext,
        deltaTime: null
    }

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);

        if (mario.pos.x > 100) {
            camera.pos.x = Math.max(0, mario.pos.x - 100);
        }

        level.comp.draw(context, camera);
    }

    timer.start();
};

const canvas = document.getElementById('screen');

const start = () => {
    window.removeEventListener('click', start);
    main(canvas);
}
window.addEventListener('click', start);