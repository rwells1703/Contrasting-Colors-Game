import {ColorEntity} from './ColorEntity.js';
import {BLOBMINSPEED, BLOBMINYVEL, BLOBBOUNCECOEFF, MAXBLOBBOUNCES} from '../Constants.js';
import {destroyEntity} from './Utils.js'

export class PaintBlob extends ColorEntity {
    constructor(arr, group, color, x, y, velocityX, velocityY) {
        super();
        this.name = 'paintBlob';
        this.sprite = group.create(x, y, 'paintBlob');
        this.arr = arr;
        this.bounceCount = 0;
        this.changeColor(color);
        this.sprite.setBounce(BLOBBOUNCECOEFF);//Very bouncy - this may need changing.
        this.sprite.setVelocity(velocityX, velocityY);
    }

    setAnimation() {
        this.sprite.anims.play('paintBlob' + this.color + "R", true);
    }

    checkTooSlow() {
        console.log(Math.abs(this.sprite.body.velocity.y));
        if (this.sprite.body.speed < BLOBMINSPEED) {
            return true;
        } else if (Math.abs(this.sprite.body.velocity.y) < BLOBMINYVEL) {
            return true;
        } else {
            return false;
        }
    }

    addBounce() {
        this.bounceCount++

        if (this.bounceCount >= MAXBLOBBOUNCES) {
            destroyEntity(this, this.arr)
        }
    }
}
