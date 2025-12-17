
export class WeaponComponent {
    #gameObject;
    #inputComponent;
    #bulletConfig;
    #bulletGroup;
    #fireBulletInterval;

    constructor(gameObject, inputComponent, bulletConfig) {
        this.#gameObject = gameObject;
        this.#inputComponent = inputComponent;
        this.#bulletConfig = bulletConfig;
        this.#fireBulletInterval = 0;

        this.#bulletGroup = this.#gameObject.scene.physics.add.group({
            name: `bullets-${Phaser.Math.RND.uuid()}`,
            enable: false,
        });
        this.#bulletGroup.createMultiple({
            key: 'bullet',
            quantity: this.#bulletConfig.maxCount,
            active: false,
            visible: false,
        });
        // console.log(this.#bulletGroup);

        this.#gameObject.scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
        this.#gameObject.once(Phaser.GameObjects.Events.DESTROY, ()  => {
            this.#gameObject.scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
        }, this);
    }

    get bulletGroup() {
        return this.#bulletGroup;
    }

    update(dt) {
        this.#fireBulletInterval -= dt;
        // console.log(dt, this.#fireBulletInterval);
        if (this.#fireBulletInterval > 0) {
            return;
        }

        if (this.#inputComponent.shootIsDown) {
            const bullet = this.#bulletGroup.getFirstDead();
            if (bullet === undefined || bullet === null) {
                return;
            }
            const x = this.#gameObject.x;
            const y = this.#gameObject.y + this.#bulletConfig.yOffset;
            bullet.enableBody(true, x, y, true, true);
            bullet.setState(this.#bulletConfig.lifespan);
            bullet.play('bullet');
            bullet.setScale(0.5);
            bullet.body.setSize(14, 18);
            bullet.setFlipY(this.#bulletConfig.flipY);
            
            bullet.body.velocity.y -= this.#bulletConfig.speed;
            this.#fireBulletInterval = this.#bulletConfig.interval;
        }
    }

    worldStep(delta){
        this.#bulletGroup.getChildren().forEach((bullet) => {
            if (!bullet.active) {
                return;
            }

            bullet.state -= delta;
            if (bullet.state <= 0) {
                bullet.disableBody(true, true);
            }
        });
    }
}