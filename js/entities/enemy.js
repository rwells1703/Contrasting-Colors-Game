import {ColorEntity} from './colorEntity.js';

export class Enemy extends ColorEntity{
    constructor (group, color, health, x, y) {
        super(color);
        this.health = health;
        this.sprite = group.create(x, y, "enemy");
        this.sprite.setBounce(0.2);
    }

    update(delta){//Called each frame. Some enemy AI could be put here.
    	// this.setVelocityX(10);
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