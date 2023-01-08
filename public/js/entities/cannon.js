import Entity from "../entity.js";
import Emitter from "../traits/emitter.js";
import { loadAudioBoard } from "../loaders/audio.js";


export function loadCannon(audioContext) {    
    return loadAudioBoard('cannon', audioContext)
    .then(audio => {
        return createCannonFactory(audio);
    });
}

function createCannonFactory(audio) {

    function emitBullet(entity, level) {
        console.log('Bullet fired', entity, level);
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