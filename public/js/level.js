import Compositor from './compositor.js';
import EntityCollider from './entitycollider.js';
import TileCollider from './tilecolider.js';

export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor();
        this.entities = new Set()
        this.tileCollider = null;
        this.entityCollider = new EntityCollider(this.entities);
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime, audioBoard) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this, audioBoard);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });
        
        this.totalTime += deltaTime;
    }
}