import {ColorEntity} from './colorEntity.js';

export class PaintBlob extends ColorEntity{
    constructor (scene, group, color, x, y, velocityX, velocityY) {
        super();
        this.sprite = group.create(x,y,'paintBlob');
        this.changeColor(color);
        this.sprite.setBounce(0.8);//Very bouncy - this may need changing.
        this.sprite.setVelocity(velocityX, velocityY);
    }
    setAnimation(){
        this.sprite.anims.play('paintBlob'+this.color+"R",true);
    }
}
