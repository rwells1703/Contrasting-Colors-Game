import {ColorEntity} from './colorEntity.js';
import {BLOBMINSPEED} from '../constants.js';
import {BLOBMINYVEL} from '../constants.js';

export class PaintBlob extends ColorEntity{
    constructor (scene, group, color, x, y, velocityX, velocityY) {
        super();
        this.sprite = group.create(x,y,'paintBlob');
        console.log(this);
        this.changeColor(color);
        this.sprite.setBounce(0.8);//Very bouncy - this may need changing.
        this.sprite.setVelocity(velocityX, velocityY);
    }
    setAnimation(){
        this.sprite.anims.play('paintBlob'+this.color+"R",true);
    }
    checkTooSlow(){
        console.log(Math.abs(this.sprite.body.velocity.y));
        if(this.sprite.body.speed < BLOBMINSPEED){
            return true;
        }else if(Math.abs(this.sprite.body.velocity.y) < BLOBMINYVEL){
            return true;
        }else{
            return false;
        }
    }
}
