import { Sides, Trait } from "../entity.js";

export default class Solid extends Trait {
    constructor() {
        super('solid');
    
    }

    obstruct(entity, side, match) {
        if (side === Sides.BOTTOM) {
            entity.bounds.bottom = match.y1;
            entity.vel.y = 0;
        }
    }
}