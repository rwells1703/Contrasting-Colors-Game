import { Entity } from './Entity.js';

export class ColorEntity extends Entity {
    constructor() {
        super();
    }
    
    changeColor(newColor) {
        this.color = newColor;
        this.updateGraphics();
    }

    updateGraphics() {
        this.sprite.anims.play(this.name + this.color, true);
    }
}

export class DirectionalColorEntity extends ColorEntity {
    updateGraphics(firstFrame) {
        if (this.sprite.body.velocity.x > 0 || firstFrame) {
            this.sprite.anims.play(this.name + this.color + 'R', true);
        } else if (this.sprite.body.velocity.x < 0){
            this.sprite.anims.play(this.name + this.color + 'L', true);
        }
    }
}