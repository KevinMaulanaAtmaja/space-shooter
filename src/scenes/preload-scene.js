import Phaser from '../lib/phaser.js';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
    // this.load.image('key', 'path');
    this.load.pack('asset_pack', 'assets/data/assets.json');
    }

    create() {
        console.log('preload');
        this.#createAnimation();
        this.scene.start('GameScene');
    }

    #createAnimation() {
        const data = this.cache.json.get('animations_json');
        data.forEach((animation) => {
            const frames = animation.frames 
            ? this.anims.generateFrameNames(animation.assetKey, {frames: animation.frames}) 
            : this.anims.generateFrameNames(animation.assetKey);
            this.anims.create({key: animation.key, frames: frames, frameRate: animation.frameRate, repeat: animation.repeat});
        });
    }
}