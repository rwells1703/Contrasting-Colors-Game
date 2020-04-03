import {ColorEntity} from './ColorEntity.js'

export class Platform extends ColorEntity {
    constructor(group, color, x, y) {
        super();
        this.name = 'platform';
        this.directional = false;
        this.sprite = group.create(x, y, "platform");
        this.changeColor(color);
    }
}
