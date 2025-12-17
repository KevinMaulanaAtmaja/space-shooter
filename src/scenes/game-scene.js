// @ts-nocheck
import { EnemySpawnerComponent } from '../components/spawners/enemy-spawner-component.js';
import { CUSTOM_EVENT, EnemyBusComponent } from '../components/events/event-bus-component.js';
import Phaser from '../lib/phaser.js';
import { FighterEnemy } from '../objects/enemies/fighter-enemy.js';
import { ScoutEnemy } from '../objects/enemies/scout-enemy.js';
import { Player } from '../objects/player.js';
import * as CONFIG from '../config.js';

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
    const eventBusComponent = new EnemyBusComponent();

    const scoutSpawner = new EnemySpawnerComponent(this, ScoutEnemy, {
      interval: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_INTERVAL,
      spawnAt: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_START
    }, eventBusComponent);
    const fighterSpawner = new EnemySpawnerComponent(this, FighterEnemy, {
      interval: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_INTERVAL,
      spawnAt: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_START
    }, eventBusComponent);

    const player = new Player(this);
    // const scoutEnemy = new ScoutEnemy(this, this.scale.width / 2, 0);
    // const fighterEnemy = new FighterEnemy(this, this.scale.width / 2, 0);

    // scout
    this.physics.add.overlap(player, scoutSpawner.phaserGroup, (playerGameObject, enemyGameObject) => {
      // console.log('player hit by enemy bullet');
      playerGameObject.colliderComponent.collideWithEnemyShip();
      enemyGameObject.colliderComponent.collideWithEnemyShip();
    });
    
    eventBusComponent.on(CUSTOM_EVENT.ENEMY_INIT, (gameObject) => {
      if (gameObject.constructor.name !== 'FighterEnemy') {
        return;
      }
      this.physics.add.overlap(player, gameObject.weaponGameObjectGroup, (playerGameObject, projectileGameObject) => {
        gameObject.weaponComponent.destroyBullet(projectileGameObject);
        playerGameObject.colliderComponent.collideWithEnemyProjectile();
    });
    })
    
    this.physics.add.overlap(scoutSpawner.phaserGroup, player.weaponGameObjectGroup, (enemyGameObject, projectileGameObject) => {
      // console.log(enemyGameObject, projectileGameObject);
      player.weaponComponent.destroyBullet(projectileGameObject);
      enemyGameObject.colliderComponent.collideWithEnemyProjectile();
    });

    // fighter
    this.physics.add.overlap(player, fighterSpawner.phaserGroup, (playerGameObject, enemyGameObject) => {
      // console.log('player hit by enemy bullet');
      playerGameObject.colliderComponent.collideWithEnemyShip();
      enemyGameObject.colliderComponent.collideWithEnemyShip();
    });
    // this.physics.add.overlap(player, fighterSpawner.phaserGroup.weaponGameObjectGroup, (playerGameObject, projectileGameObject) => {
    //   // console.log(playerGameObject, projectileGameObject);
    //   fighterSpawner.weaponComponent.destroyBullet(projectileGameObject);
    //   playerGameObject.colliderComponent.collideWithEnemyProjectile();
    // });
    
    this.physics.add.overlap(fighterSpawner.phaserGroup, player.weaponGameObjectGroup, (enemyGameObject, projectileGameObject) => {
      // console.log(enemyGameObject, projectileGameObject);
      player.weaponComponent.destroyBullet(projectileGameObject);
      enemyGameObject.colliderComponent.collideWithEnemyProjectile();
    });
    // this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }
}

// boot => preload => game