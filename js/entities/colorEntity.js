export class ColorEntity {
    changeColor(newColor) {
        this.color = newColor;
        this.setAnimation();//Maybe not needed, as should be set in update.
    }

    setAnimation() {
        if (this.sprite.body.velocity.x < 0) {
            var direction = "L"
        } else {
            var direction = "R"
        }

        this.sprite.anims.play(this.name + this.color + direction, true);
    }

    destroy() {
        this.sprite.destroy();
    }
}