import { ColorEntity } from './ColorEntity.js';
import { BLOBBOUNCECOEFF, MAXBLOBBOUNCES } from '../Constants.js';
import { destroyEntity } from './Utils.js';

export class PaintBlob extends ColorEntity {
    constructor(arr, group, color, x, y, velocityX, velocityY) {
        super();
        this.name = 'paintBlob';
        this.directional = false;
        this.sprite = group.create(x, y, 'paintBlob');
        this.arr = arr;
        this.bounceCount = 0;
        this.changeColor(color);
        this.sprite.setBounce(BLOBBOUNCECOEFF);//Very bouncy - this may need changing.
        this.sprite.setVelocity(velocityX, velocityY);
    }

    setAnimation() {
        this.sprite.anims.play('paintBlob' + this.color, true);
    }

    addBounce() {
        this.bounceCount++

        if (this.bounceCount >= MAXBLOBBOUNCES) {
            destroyEntity(this, this.arr);
        }
    }
}
