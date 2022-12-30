import { Trait } from "../entity.js";

export default class Stomper extends Trait {
    constructor() {
        super('stomper');

        this.bounceSpeed = 400;
        this.didStomp = false;

        this.onStomp = () => {}
    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us, them) {

        if (!them.killable || them.killable.dead) {
            return;
        }

        if (us.vel.y > them.vel.y) {
            this.bounce(us, them);
            this.didStomp = true;
            this.onStomp(us, them);
        }
    }

    update(entity, {audioContext}) {
        if (this.didStomp) {
            entity.audio.playAudio('stomp', audioContext);
            this.didStomp = false;
        }
    }
}