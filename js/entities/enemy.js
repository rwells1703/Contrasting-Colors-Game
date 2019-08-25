export class Enemy {
    constructor (group, color, health, x, y) {
        this.color = color;
        this.health = health;
        this.sprite = group.create(x, y, "enemy");
        this.sprite.setBounce(0.2);
    }

    update(delta){//Called each frame. Some enemy AI could be put here.
    	
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