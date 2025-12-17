export const CUSTOM_EVENT = Object.freeze({
    ENEMY_INIT: 'ENEMY_INIT',
    ENEMY_DESTROYED: 'ENEMY_DESTROYED',
})

export class EnemyBusComponent extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }
}