import {ColorEntity} from './colorEntity.js'

export class Fountain extends ColorEntity{
	constructor(group,color,x,y){
		super();
		this.sprite = group.create(x,y,'fountain');
		this.changeColor(color);

	}

    setAnimation(){
        this.sprite.anims.play('fountain'+this.color+"R",true);
    }

}