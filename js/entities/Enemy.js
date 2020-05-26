import { DirectionalColorEntity } from './ColorEntity.js';
import { ENEMY_BLOB_TIMEOUT, BLOB_LAUNCH_SPEED } from '../Constants.js';
import { hurlBlob, doesColourDoDamage } from '../Utils.js';


export class Enemy extends DirectionalColorEntity {
    constructor (group, arr, color, health, x, y) {
        super();
            
        this.name = 'Enemy';
        this.directional = true;

        this.health = health;

        this.sprite = group.create(x, y, this.name);
        this.arr = arr;

        this.blobTimer = 0;
        this.prevBlobTimer = 0;

        this.changeColor(color);

        this.updateGraphics(true);
    }

    damage(damValue){
        this.health -= damValue;

        if (this.health <= 0) {
            this.destroy();
        }
    }

    //Called each frame. Some enemy AI could be put here.
    update(scene, delta) {
        // If enough time has passed since the last blob was fired
        if ((this.blobTimer - this.prevBlobTimer) > ENEMY_BLOB_TIMEOUT && doesColourDoDamage(this.color, scene.player.color)) {
            let targetPosX = scene.player.sprite.x;
            let targetPosY = scene.player.sprite.y + 0.5*(scene.player.sprite.x-this.sprite.x);
            hurlBlob(scene, this,  targetPosX, targetPosY, BLOB_LAUNCH_SPEED+this.sprite.body.velocity.x);
            
            // Reset the timer
            this.prevBlobTimer = this.blobTimer;
        }

        this.blobTimer = delta;
        
        this.updateGraphics();
    }
}

export class MovingEnemy extends Enemy {
    constructor (group, arr, color, health, x, y) {
        super(group, arr, color, health, x, y);

        this.speed = Math.floor(50 + Math.random()*100);

        this.sprite.setVelocityX(this.speed);
        this.sprite.setBounce(0.2);
    }
    update(scene, delta) {
        if (this.sprite.body.blocked.left) {
            this.sprite.setVelocityX(this.speed);
        } else if (this.sprite.body.blocked.right) {
            this.sprite.setVelocityX(-this.speed);
        }

        super.update(scene, delta);
    }
}

export class BouncingEnemy extends MovingEnemy {
    constructor(group, color, health, x, y) {
        super(group, color, health, x, y);

        this.name = 'BouncingEnemy';
        
        this.sprite.setBounce(1);
    }
}