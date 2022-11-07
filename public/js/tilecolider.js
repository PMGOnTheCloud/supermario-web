import TileResolver from './tileresolver.js';

export default class TileCollider {
    constructor(tilesMatrix) {
        this.tiles = new TileResolver(tilesMatrix);
    }

    test(entity) {
        const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
        if (match) {
            console.log('Matched tile', match, match.tile);
        }
    }
}