import { DirectionalColorEntity } from './ColorEntity.js';

export class Enemy extends DirectionalColorEntity {
    constructor (group, arr, color, health, x, y) {
        super();
        
        this.name = 'Enemy';
        this.directional = true;

        this.health = health;
        this.speed = Math.floor(50 + Math.random()*100);

        this.sprite = group.create(x, y, this.name);
        this.arr = arr;

        this.sprite.setVelocityX(this.speed);
        this.sprite.setBounce(0.2);

        this.changeColor(color);
    }

    damage(damValue){
        this.health -= damValue;

        if (this.health <= 0) {
            this.destroy();
        }
    }

    //Called each frame. Some enemy AI could be put here.
    update() {
        if (this.sprite.body.touching.left) {
            this.sprite.setVelocityX(this.speed);
        } else if (this.sprite.body.touching.right) {
            this.sprite.setVelocityY(-this.speed);
        }
        
        this.updateGraphics();
    }
}

export class BouncingEnemy extends Enemy {
    constructor(group, color, health, x, y) {
        super(group, color, health, x, y);

        this.name = 'bouncingEnemy'
        
        this.sprite.setBounce(1);
    }
}