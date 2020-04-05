import { ColorEntity } from './ColorEntity.js';
import { BLOB_BOUNCE_COEFFICIENT, BLOB_MAX_BOUNCES } from '../Constants.js';

export class Blob extends ColorEntity {
    constructor(group, arr, color, x, y, velocityX, velocityY) {
        super();

        this.name = 'Blob';
        this.directional = false;

        this.bounceCount = 0;

        this.sprite = group.create(x, y, this.name);
        this.arr = arr;

        this.sprite.setBounce(BLOB_BOUNCE_COEFFICIENT);
        this.sprite.setVelocity(velocityX, velocityY);

        this.changeColor(color);
    }

    addBounce() {
        this.bounceCount++

        if (this.bounceCount >= BLOB_MAX_BOUNCES) {
            this.destroy();
        }
    }
}
