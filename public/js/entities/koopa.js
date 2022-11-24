import Entity, { Sides } from "../entity.js";
import PendulumWalkBehaviour from "../traits/pendulumwalkbehaviour.js";
import { loadSpriteSheet } from '../loaders.js';


export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

function createKoopaFactory(sprite) {

    const walkAnim = sprite.animations.get('walk');

    function drawKoopa(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);

        koopa.addTrait(new PendulumWalkBehaviour());

        koopa.draw = drawKoopa;
        
        return koopa;
    }
}