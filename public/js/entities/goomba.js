import Entity, { Trait } from "../entity.js";
import PendulumWalkBehaviour from "../traits/pendulumwalkbehaviour.js";
import { loadSpriteSheet } from '../loaders.js';


export function loadGoomba() {
    return loadSpriteSheet('goomba')
    .then(createGoombaFactory);
}

function createGoombaFactory(sprite) {

    const walkAnim = sprite.animations.get('walk');

    function drawGoomba(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait(new PendulumWalkBehaviour());
        goomba.addTrait(new Behaviour());

        goomba.draw = drawGoomba;
        
        return goomba;
    }
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us, them) {
        if (them.stomper) {
            us.pendulumWalk.speed = 0;
        }
    }
}