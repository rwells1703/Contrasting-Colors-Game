export class ColorEntity{
	constructor(color){
		this.changeColor(color);
		
		
	}
	changeColor(newColor){
		this.color = newColor
	}
	destroy(){
		this.sprite.destroy();
	}
}