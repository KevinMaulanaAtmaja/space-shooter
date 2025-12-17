// @ts-nocheck
import Phaser from '../lib/phaser.js';
import { FighterEnemy } from '../objects/enemies/fighter-enemy.js';
import { ScoutEnemy } from '../objects/enemies/scout-enemy.js';
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
    const scoutEnemy = new ScoutEnemy(this, this.scale.width / 2, 0);
    const fighterEnemy = new FighterEnemy(this, this.scale.width / 2, 0);

    this.physics.add.overlap(player, fighterEnemy, (playerGameObject, enemyGameObject) => {
      // console.log('player hit by enemy bullet');
      playerGameObject.colliderComponent.collideWithEnemyShip();
      enemyGameObject.colliderComponent.collideWithEnemyShip();
    });
    this.physics.add.overlap(player, fighterEnemy.weaponGameObjectGroup, (playerGameObject, projectileGameObject) => {
      // console.log(playerGameObject, projectileGameObject);
      fighterEnemy.weaponComponent.destroyBullet(projectileGameObject);
      playerGameObject.colliderComponent.collideWithEnemyProjectile();
    });
    
    this.physics.add.overlap(fighterEnemy, player.weaponGameObjectGroup, (enemyGameObject, projectileGameObject) => {
      // console.log(enemyGameObject, projectileGameObject);
      player.weaponComponent.destroyBullet(projectileGameObject);
      enemyGameObject.colliderComponent.collideWithEnemyProjectile();
    });
    // this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  // update(){
  //   console.log(this.#cursorKeys.up.isDown, this.#cursorKeys.down.isDown, this.#cursorKeys.left.isDown, this.#cursorKeys.right.isDown);
    
  // }
}

// boot => preload => game