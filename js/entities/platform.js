export class Platform{
	constructor(platformGroup, color, x, y){
		this.sprite = platformGroup.create(x, y, "platform");
		this.color = color;
	}
}