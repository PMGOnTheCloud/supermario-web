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

    return function createCannon() {
        const cannon = new Entity();
        
        cannon.audio = audio;
        
        cannon.addTrait(new Emitter());

        return cannon;
    }
}