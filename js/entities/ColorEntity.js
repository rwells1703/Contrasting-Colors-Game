export class ColorEntity {
    changeColor(newColor) {
        this.color = newColor;
        this.setAnimation();
    }

    setAnimation() {
        this.sprite.anims.play(this.name + this.color, true);
    }

    destroy() {
        this.sprite.destroy();
    }
}

export class DirectionalColorEntity extends ColorEntity {
    setAnimation() {
        if (this.sprite.body.velocity.x < 0) {
            this.sprite.anims.play(this.name + this.color + "L", true);
        } else if (this.sprite.body.velocity.x > 0){
            this.sprite.anims.play(this.name + this.color + "R", true);
        }
    }
}