export class ColorEntity{
	changeColor(newColor){
		this.color = newColor;
        // this.setAnimation();//Maybe not needed, as should be set in update.
    }

	setAnimation(){
        this.sprite.anims.play(this.getAnimationSuperName()+this.color+((this.sprite.body.velocity.x<0)?"L":"R"),true);
    }

    getAnimationSuperName(){}

	destroy(){
		this.sprite.destroy();
	}
}
