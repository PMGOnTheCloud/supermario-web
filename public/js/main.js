import Camera from './camera.js';
import Timer from './timer.js';
import Entity from './entity.js';
import PlayerController from './traits/playercontroller.js';
import { createLevelLoader } from './loaders/level.js';
import { createAudioLoader } from './loaders/audio.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer } from './layers/collision.js';
import { createCameraLayer } from './layers/camera.js';
import { createDashboardLayer } from './layers/dashboard.js';
import { loadEntities } from './entities.js';
import { loadFont } from './loaders/font.js';


function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas) {
    const context = canvas.getContext('2d');
    
    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont()
    ]);
    
    const audioContext = new AudioContext();
    const loadAudio = createAudioLoader(audioContext);
    loadAudio('/audio/jump.ogg')
        .then(buffer => {
            console.log(buffer);
            const source = audioContext.createBufferSource();
            source.connect(audioContext.destination);
            source.buffer = buffer;
            source.start(0);
        })

    const loadLevel = await createLevelLoader(entityFactory);
    
    const level = await loadLevel('1-1');

    const camera = new Camera();
    
    const mario = entityFactory.mario();

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);
    
    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font, playerEnv));
    
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

const start = () => {
    window.removeEventListener('click', start);
    main(canvas);
}
window.addEventListener('click', start);