import { ColorEntity } from './ColorEntity.js';
import { BLOBBOUNCECOEFF, MAXBLOBBOUNCES } from '../Constants.js';
import { destroyEntity } from './Utils.js';

export class PaintBlob extends ColorEntity {
    constructor(group, arr, color, x, y, velocityX, velocityY) {
        super();

        this.name = 'paintBlob';
        this.directional = false;

        this.bounceCount = 0;

        this.sprite = group.create(x, y, 'paintBlob');
        this.arr = arr;

        this.sprite.setBounce(BLOBBOUNCECOEFF);
        this.sprite.setVelocity(velocityX, velocityY);

        this.changeColor(color);
    }

    addBounce() {
        this.bounceCount++

        if (this.bounceCount >= MAXBLOBBOUNCES) {
            destroyEntity(this, this.arr);
        }
    }
}
