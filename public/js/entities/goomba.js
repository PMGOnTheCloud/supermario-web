import Entity, { Trait } from "../entity.js";
import PendulumWalkBehaviour from "../traits/pendulumwalkbehaviour.js";
import Killable from "../traits/killable.js";
import { loadSpriteSheet } from '../loaders.js';


export function loadGoomba() {
    return loadSpriteSheet('goomba')
    .then(createGoombaFactory);
}

function createGoombaFactory(sprite) {

    const walkAnim = sprite.animations.get('walk');

    function routeAnim(goomba) {
        if (goomba.killable.dead) {
            return 'flat';
        }

        return walkAnim(goomba.lifetime);
    }

    function drawGoomba(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait(new PendulumWalkBehaviour());
        goomba.addTrait(new Behaviour());
        goomba.addTrait(new Killable());

        goomba.draw = drawGoomba;
        
        return goomba;
    }
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
            }            
        }
    }
}