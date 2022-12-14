import Entity, { Trait } from "../entity.js";
import Killable from "../traits/killable.js";
import Velocity from "../traits/velocity.js";
import Gravity from "../traits/gravity.js";
import { loadSpriteSheet } from '../loaders.js';


export function loadBullet() {
    return loadSpriteSheet('bullet')
    .then(createBulletFactory);
}

function createBulletFactory(sprite) {

    function drawBullet(context) {
        sprite.draw('bullet', context, 0, 0, this.vel.x < 0);
    }

    return function createBullet() {
        const bullet = new Entity();
        bullet.size.set(16, 14);

        bullet.addTrait(new Velocity());
        bullet.addTrait(new Behaviour());
        bullet.addTrait(new Killable());

        bullet.draw = drawBullet;
        
        return bullet;
    }
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
        this.gravity = new Gravity();
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.vel.set(100, -200);
            } else {
                them.killable.kill();
            }        
        } 
    }

    update(entity, gameContext, level) {
        if (entity.killable.dead) {
            this.gravity.update(entity, gameContext, level);
        }
    }
}