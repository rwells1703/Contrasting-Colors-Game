export class HealthBar extends Phaser.GameObjects.Group{
	constructor(scene){
		super(scene);
		this.bar = this.create(100, 100, "healthbar").setOrigin(0);
		this.bar.fixedTocamera = true;
		this.outline = this.create(100, 100, "healthbar-outline").setOrigin(0);
	}

	setPercent(proportion){
		this.bar.scaleX = proportion;
	}
}