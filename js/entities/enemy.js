import {ColorEntity} from './colorEntity.js';

export class Enemy extends ColorEntity{
    constructor (group, color, health, x, y) {
        super(color);
        this.health = health;
        this.sprite = group.create(x, y, "enemy");
        this.sprite.setBounce(0.2);
        this.dir=1;
        this.sprite.setVelocityX(50);
        this.timeOfPreviousCollision = 0;
    }

    update(delta){//Called each frame. Some enemy AI could be put here.
        this.timeOfCollision = delta;
        this.timeSinceLastCollision = this.timeOfCollision - this.timeOfPreviousCollision;

        if(this.timeSinceLastCollision > 100){
            // console.log(this.sprite.body.touching.left);
            // console.log(this.sprite.body.touching.right);
            if(this.sprite.body.touching.left || this.sprite.body.touching.right){
                // console.log(this.sprite.body.velocity.x);
                this.dir*=-1;
                this.sprite.setVelocityX(this.dir*50);
                console.log(this.sprite.body.velocity.x);
            }
            this.timeOfPreviousCollision = this.timeOfCollision;

        }

        // console.log(this.sprite.body.velocity.x);

    }
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