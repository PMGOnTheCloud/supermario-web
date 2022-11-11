import Entity from "./entity.js";
import Jump from "./traits/jump.js";
import Go from "./traits/go.js";
import { loadSpriteSheet } from './loaders.js';



export function createMario() {
    return loadSpriteSheet('mario')
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(14,16);
            
            mario.addTrait(new Go());
            mario.addTrait(new Jump());


            mario.draw = function drawMario(context) {
                sprite.draw('idle', context, 0, 0);
            }
        
            return mario;
        });   
}