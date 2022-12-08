import { Vec2 } from './math.js';
import BoundingBox from './boundingbox.js';

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
}

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    collides(us, them) {

    }

    obstruct() {
        
    }

    update() {
        
    }
}


export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.lifetime = 0;
    
        this.canCollide = true;

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    collides(candidate) {
        this.traits.forEach(traits => {
            traits.collides(this, candidate);
        });
    }

    obstruct(side) {
        this.traits.forEach(traits => {
            traits.obstruct(this, side);
        });
    }

    draw() {
        
    }

    update(deltaTime, level) {
        this.traits.forEach(traits => {
            traits.update(this, deltaTime, level);
        });

        this.lifetime += deltaTime;
    }
}