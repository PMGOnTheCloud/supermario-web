import Entity from './entity.js';
import Player from './traits/player.js';
import PlayerController from './traits/playercontroller.js';

export function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

export function createPlayer(entity) {
    entity.addTrait(new Player());
    return entity;
}

export function* findPlayers(level) {
    for (const entity of level.entities) {
        if (entity.player) {
            yield entity;
        }
    }
}