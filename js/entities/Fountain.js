import { ColorEntity } from './ColorEntity.js';

export class Fountain extends ColorEntity {
    constructor(group, color, x, y) {
        super();
        
        this.name = 'Fountain';
        this.directional = false;
        
        this.sprite = group.create(x, y, this.name);

        this.changeColor(color);
    }
}