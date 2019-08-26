import {ColorEntity} from './colorEntity.js'
export class Platform extends ColorEntity{
	constructor(group, color, x, y){
		super();
		this.sprite = group.create(x, y, "platform");
        this.changeColor(color);
	}

    setAnimation(){
        this.sprite.anims.play('platform'+this.color+"R",true);
    }
}
