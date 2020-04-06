import { Entity } from './Entity.js';

export class Artwork extends Entity {
    constructor(group, arr, x, y) {
        super();
        
        this.name = 'Artwork';

        this.sprite = group.create(x, y, this.name);
        this.arr = arr;
    }
}