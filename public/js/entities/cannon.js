import Entity from "../entity.js";
import Emitter from "../traits/emitter.js";
import { loadAudioBoard } from "../loaders/audio.js";
import { findPlayers } from "../player.js";

const HOLD_FIRE_THRESHOLD = 30;

export function loadCannon(audioContext, entityFactories) {    
    return loadAudioBoard('cannon', audioContext)
    .then(audio => {
        return createCannonFactory(audio, entityFactories);
    });
}

function createCannonFactory(audio, entityFactories) {

    function emitBullet(cannon, level) {
        for (const player of findPlayers(level)) {
            if (player.pos.x > cannon.pos.x - HOLD_FIRE_THRESHOLD
            && player.pos.x < cannon.pos.x + HOLD_FIRE_THRESHOLD) {
                return;
            }
        }

        const bullet = entityFactories.bullet();

        bullet.pos.copy(cannon.pos);


        cannon.sounds.add('shoot');
        level.entities.add(bullet);
    }

    return function createCannon() {
        const cannon = new Entity();
        
        cannon.audio = audio;

        const emitter = new Emitter();
        emitter.interval = 4;
        emitter.emitters.push(emitBullet);
        cannon.addTrait(emitter);

        return cannon;
    }
}