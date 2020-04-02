import {ColorEntity} from './colorEntity.js';
import * as Util from './utils.js'

export class Enemy extends ColorEntity{
    constructor (group,arr, color, health, x, y) {
        super();
        this.arr = arr;
        this.health = health;
        this.sprite = group.create(x, y, "enemy");
        this.changeColor(color);
        this.sprite.setBounce(0.2);
        this.speed = Math.floor(50+Math.random()*100);
        this.sprite.setVelocityX(this.speed);
    }

    damage(damValue){
        this.health -= damValue;
        if (this.health <= 0){
            Util.destroyEntity(this,this.arr);
        }
    }

    update(delta){//Called each frame. Some enemy AI could be put here.
        if(this.sprite.body.touching.left){
            this.sprite.setVelocityX(this.speed);
        }else if(this.sprite.body.touching.right){
            this.sprite.setVelocityY(-this.speed);
        }
        this.setAnimation();
    }
    getAnimationSuperName(){return "enemy";}
}


export class BouncingEnemy extends Enemy{
    constructor(group, color, health, x, y){
        super(group, color, health, x, y);
        this.sprite.setBounce(1);
    }
}

export class BossEnemy extends Enemy{
    constructor(group, color, x, y){
        super(group, color, 100, x, y);
        this.sprite = group.create(x, y, "boss-enemy");
    }
}
