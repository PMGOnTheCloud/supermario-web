import Entity, { Sides, Trait } from "../entity.js";

export default class PendulumBehaviour extends Trait {
    constructor() {
        super('pendulumMove');
        
        this.enabled = true;
        this.speed = -30;
    }

    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime) {
        if (this.enabled) {
            entity.vel.x = this.speed;
        }
    }
}