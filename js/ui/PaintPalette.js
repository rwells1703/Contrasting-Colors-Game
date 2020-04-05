export class PaintPalette extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        this.paintPalette = this.create(100, 100, "paintPalette").setOrigin(0);
        this.paintPalette.fixedTocamera = true;
        this.paintPalette.setScrollFactor(0);
    }

    updateColors(playerColor) {
        
    }
}