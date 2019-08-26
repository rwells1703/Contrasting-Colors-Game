import * as CON from '../constants.js';

export class HelpScene extends Phaser.Scene{
	constructor(){
		super({key: CON.SCENES.HELPSCENE});
	}

	create(){
		console.log("help scene entered");
		this.btnSoundFX = this.sound.add("buttonSound");

		this.title = this.add.text(100, 100, "Help", CON.TITLE_FONT);

		this.tweens.add({
			targets: this.title,
			duration: 1500,
			alpha: {from: 0, to: 1},
			yoyo: true,
			ease: "Elastic",
			repeat: -1
		});

		this.backBtn = this.add.text(100, 500, "Back to main menu", CON.BUTTON_FONT);
		this.backBtn.setInteractive()
				.on("pointerover", ()=>this.backBtn.setColor("green"))
				.on("pointerout", ()=>this.backBtn.setColor("white"))
				.on("pointerdown", ()=>{
					this.btnSoundFX.play();
					this.scene.start(CON.SCENES.MENUSCENE);
				});
	}
}