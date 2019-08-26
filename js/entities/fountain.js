import {ColorEntity} from './colorEntity.js'

export class Fountain extends ColorEntity{
	constructor(scene,group,color,x,y){
		super();
		this.color = color;
		this.sprite = scene.physics.add.sprite(x,y,'fountain')
		group.add(this,false)
		this.sprite.data = this;
	}
}