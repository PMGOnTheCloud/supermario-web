import Entity from "../entity.js";
import Emitter from "../traits/emitter.js";
import { loadAudioBoard } from "../loaders/audio.js";


export function loadCannon(audioContext, entityFactories) {    
    return loadAudioBoard('mario', audioContext)
    .then(audio => {
        return createCannonFactory(audio, entityFactories);
    });
}

function createCannonFactory(audio, entityFactories) {

    function emitBullet(cannon, level) {
        const bullet = entityFactories.bullet();

        bullet.pos.copy(cannon.pos);

        level.entities.add(bullet);
    }

    return function createCannon() {
        const cannon = new Entity();
        
        cannon.audio = audio;

        const emitter = new Emitter();
        emitter.emitters.push(emitBullet);
        cannon.addTrait(emitter);

        return cannon;
    }
}