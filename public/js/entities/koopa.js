import Entity, { Trait } from "../entity.js";
import PendulumWalkBehaviour from "../traits/pendulumwalkbehaviour.js";
import Killable from "../traits/killable.js";
import { loadSpriteSheet } from '../loaders.js';


export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                them.stomper.bounce();
                us.pendulumWalk.speed = 0;
            } else {
                them.killable.kill();
            }        
        } 
    }
}

function createKoopaFactory(sprite) {

    const walkAnim = sprite.animations.get('walk');

    function drawKoopa(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;

        koopa.addTrait(new PendulumWalkBehaviour());
        koopa.addTrait(new Behaviour);
        koopa.addTrait(new Killable());

        koopa.draw = drawKoopa;
        
        return koopa;
    }
}