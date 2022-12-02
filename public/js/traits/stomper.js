import { Trait } from "../entity.js";

export default class Stomper extends Trait {
    constructor() {
        super('stomper');
    
        this.speed = -30;
    }

    
}