import Phaser from '../lib/phaser.js';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
    // this.load.image('key', 'path');
    this.load.json('animations_json', 'assets/data/animations.json');
    }

    create() {
        console.log('boot');
        this.scene.start('PreloadScene');
    }
}