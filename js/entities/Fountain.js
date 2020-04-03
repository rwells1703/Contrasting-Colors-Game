import { ColorEntity } from './ColorEntity.js';

export class Fountain extends ColorEntity {
    constructor(group, color, x, y) {
        super();
        this.name = 'fountain';
        this.directional = false;
        this.sprite = group.create(x, y, 'fountain');
        this.changeColor(color);
    }
}