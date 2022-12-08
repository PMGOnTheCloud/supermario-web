import Entity, { Trait } from "../entity.js";
import PendulumWalkBehaviour from "../traits/pendulumwalkbehaviour.js";
import Killable from "../traits/killable.js";
import { loadSpriteSheet } from '../loaders.js';


export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Behaviour extends Trait {
    constructor() {
        super('behaviour');

        this.hideTime = 0;
        this.hideDuration = 5;
        this.panicSpeed = 220;
        this.state = STATE_WALKING;
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                this.handleStomp(us, them);
            } else {
                this.handleNudge(us, them);
            }        
        } 
    }

    handleNudge(us, them) {
        if (us.state === STATE_WALKING) {
            them.killable.kill();
        } else {
            this.panic(us, them);
        }
        
    }

    handleStomp(us, them) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        } else if  (this.state === STATE_HIDING) {
            us.killable.kill();
            us.vel.set(100, -150);
            us.canCollide = false;
        } else if (this.state === STATE_PANIC) {
            this.hide(us);
        }
    }

    hide(us) {
        us.vel.x = 0;
        us.pendulumWalk.enabled = false;
        this.hideTime = 0;
        this.state = STATE_HIDING;
    }

    unhide(us) {
        us.pendulumWalk.enabled = true;
        this.state = STATE_WALKING;
    }

    panic(us, them) {
        us.pendulumWalk.enabled = true;
        us.pendulumWalk.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }

    update(us, deltaTime) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideDuration) {
                this.unhide(us);
            }
        }
    }
}

function createKoopaFactory(sprite) {

    const walkAnim = sprite.animations.get('walk');

    function routeAnim(koopa) {
        if (koopa.behaviour.state === STATE_HIDING || koopa.behaviour.state === STATE_PANIC) {
            return 'hiding';
        }
        
        return walkAnim(koopa.lifetime);
    }

    function drawKoopa(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
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