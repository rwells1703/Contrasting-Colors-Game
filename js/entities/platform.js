import {ColorEntity} from './colorEntity.js'
export class Platform extends ColorEntity{
	constructor(group, color, x, y){
		super(color);
		this.sprite = group.create(x, y, "platform");
	}
}