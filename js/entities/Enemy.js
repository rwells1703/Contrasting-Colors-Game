import { DirectionalColorEntity } from './ColorEntity.js';
import { destroyEntity } from './Utils.js';

export class Enemy extends DirectionalColorEntity {
    constructor (group, arr, color, health, x, y) {
        super();
        this.name = 'enemy';
        this.directional = true;
        this.arr = arr;
        this.health = health;
        this.sprite = group.create(x, y, 'enemy');
        this.changeColor(color);
        this.sprite.setBounce(0.2);
        this.speed = Math.floor(50 + Math.random()*100);
        this.sprite.setVelocityX(this.speed);
    }

    damage(damValue){
        this.health -= damValue;

        if (this.health <= 0) {
            destroyEntity(this, this.arr);
        }
    }

    //Called each frame. Some enemy AI could be put here.
    update(delta) {
        if (this.sprite.body.touching.left) {
            this.sprite.setVelocityX(this.speed);
        } else if (this.sprite.body.touching.right) {
            this.sprite.setVelocityY(-this.speed);
        }
        
        this.setAnimation();
    }
}

export class BouncingEnemy extends Enemy {
    constructor(group, color, health, x, y) {
        super(group, color, health, x, y);
        this.sprite.setBounce(1);
    }
}