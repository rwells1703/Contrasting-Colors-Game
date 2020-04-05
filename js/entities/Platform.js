import { ColorEntity } from './ColorEntity.js';

export class Platform extends ColorEntity {
    constructor(group, color, x, y) {
        super();
        
        this.name = 'Platform';
        this.directional = false;

        this.sprite = group.create(x, y, this.name);
        
        this.changeColor(color);
    }
}
