import TileResolver from './tileresolver.js';

export default class TileCollider {
    constructor(tilesMatrix) {
        this.tiles = new TileResolver(tilesMatrix);
    }

    checkY(entity) {
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y
        );

        matches.forEach(match => {

            if (match.tile.name !== 'ground') {
                return;
            }
    
            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }

        });
    }

    test(entity) {
        this.checkY(entity);
    }
}