import { ColorEntity } from './ColorEntity.js';
import { BLOB_BOUNCE_COEFFICIENT, BLOB_MAX_BOUNCES } from '../Constants.js';
import { destroyEntity } from './Utils.js';

export class PaintBlob extends ColorEntity {
    constructor(group, arr, color, x, y, velocityX, velocityY) {
        super();

        this.name = 'paintBlob';
        this.directional = false;

        this.bounceCount = 0;

        this.sprite = group.create(x, y, 'paintBlob');
        this.arr = arr;

        this.sprite.setBounce(BLOB_BOUNCE_COEFFICIENT);
        this.sprite.setVelocity(velocityX, velocityY);

        this.changeColor(color);
    }

    addBounce() {
        this.bounceCount++

        if (this.bounceCount >= BLOB_MAX_BOUNCES) {
            destroyEntity(this, this.arr);
        }
    }
}
