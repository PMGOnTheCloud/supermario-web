import { loadMario } from './entities/mario.js';
import { loadGoomba } from './entities/goomba.js';
import { loadKoopa } from './entities/koopa.js';
import { loadBullet } from './entities/bullet.js';

export function loadEntities(audioContext) {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadMario(audioContext).then(addAs('mario')),
        loadGoomba(audioContext).then(addAs('goomba')),
        loadKoopa(audioContext).then(addAs('koopa')),
        loadBullet(audioContext).then(addAs('bullet')) 
    ])
    .then(() => entityFactories);
}