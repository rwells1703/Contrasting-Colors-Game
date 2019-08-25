import {ColorEntity} from './colorEntity.js';

export class PaintBlob extends ColorEntity{
    constructor (scene, group, color, x, y, velocityX, velocityY) {
    	super(color);
        this.sprite = scene.physics.add.sprite(x,y,'paintBlob');
        group.add(this.sprite,false);
        this.sprite.setBounce(0.8);//Very bouncy - this may need changing.
        this.sprite.setVelocity(velocityX, velocityY);
    }
}