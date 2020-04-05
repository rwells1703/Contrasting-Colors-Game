import { COLORS } from "../Constants.js";
import { doesColourDoDamage } from "../Utils.js";

export class PaintPalette extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        let xOffset = 912;
        let yOffset = 48;
        
        this.paintPalette = this.create(xOffset, yOffset, "PaintPalette");
        this.paintPalette.setOrigin(0);
        this.paintPalette.setScrollFactor(0);

        this.paletteColors = [
            {color: COLORS.BLUE, sprite: this.create(xOffset, yOffset, "PaintPaletteBlue").setOrigin(0).setScrollFactor(0)},
            {color: COLORS.GREEN, sprite: this.create(xOffset, yOffset, "PaintPaletteGreen").setOrigin(0).setScrollFactor(0)},
            {color: COLORS.ORANGE, sprite: this.create(xOffset, yOffset, "PaintPaletteOrange").setOrigin(0).setScrollFactor(0)},
            {color: COLORS.PURPLE, sprite: this.create(xOffset, yOffset, "PaintPalettePurple").setOrigin(0).setScrollFactor(0)},
            {color: COLORS.RED, sprite: this.create(xOffset, yOffset, "PaintPaletteRed").setOrigin(0).setScrollFactor(0)},
            {color: COLORS.YELLOW, sprite: this.create(xOffset, yOffset, "PaintPaletteYellow").setOrigin(0).setScrollFactor(0)}
        ]
    }

    updateColors(newColor) {
        for (let paletteColor of this.paletteColors) {
            if (doesColourDoDamage(paletteColor.color, newColor)) {
                paletteColor.sprite.alpha = 1;
            } else {
                paletteColor.sprite.alpha = 0.4;
            }
        }
    }
}