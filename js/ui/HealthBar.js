export class HealthBar extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        this.bar = this.create(100, 100, "HealthBar").setOrigin(0);
        this.bar.setScrollFactor(0);

        this.outline = this.create(100, 100, "HealthBarOutline").setOrigin(0);
        this.outline.setScrollFactor(0);
    }

    setPercent(proportion){
        this.bar.scaleX = proportion;
    }
}