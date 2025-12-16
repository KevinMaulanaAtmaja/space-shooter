import Phaser from '../lib/phaser.js';
import { Player } from '../objects/player.js';

export class GameScene extends Phaser.Scene {
  // #cursorKeys;

  constructor() {
    super({ key: 'GameScene' });
  }

    preload() {
    // this.load.image('key', 'path');
    this.load.pack('asset_pack', 'assets/data/assets.json');
  }

  create() {
    // this.add
    //   .text(this.scale.width / 2, this.scale.height / 2, 'Hello World', {
    //     fontSize: '32px',
    //   })
    //   .setOrigin(0.5);
    // this.add.image(100, 100, 'ship');
    // this.add.sprite(100, 100, 'ship').play('explosion');

    const player = new Player(this);
    // this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  // update(){
  //   console.log(this.#cursorKeys.up.isDown, this.#cursorKeys.down.isDown, this.#cursorKeys.left.isDown, this.#cursorKeys.right.isDown);
    
  // }
}

// boot => preload => game