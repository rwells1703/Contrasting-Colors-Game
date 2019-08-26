import * as CON from "../constants.js";
import {SCENES} from "../constants.js";

export class MenuScene extends Phaser.Scene{
	constructor(){
		super({key: SCENES.MENUSCENE});
	}

	create(){
		this.btnSoundFX = this.sound.add("buttonSound");

		this.title = this.add.text(100, 100, "Main Menu", CON.TITLE_FONT);



		this.startButton = this.add.text(100, 200, "Start game", CON.BUTTON_FONT);
		this.startButton.setInteractive()
					.on("pointerover", ()=>this.startButton.setColor("red"))
					.on("pointerout", ()=>this.startButton.setColor("white"))
					.on("pointerdown", ()=>{
						this.btnSoundFX.play();
						this.scene.start(SCENES.GAMESCENE);
					});


		this.helpButton = this.add.text(100, 230, "Help", CON.BUTTON_FONT);
		this.helpButton.setInteractive()
					.on("pointerover", ()=>this.helpButton.setColor("blue"))
					.on("pointerout", ()=>this.helpButton.setColor("white"))
					.on("pointerdown", ()=>{
						console.log("hello there");
						this.btnSoundFX.play();
						console.log(SCENES.HELPSCENE);
						this.scene.start(SCENES.HELPSCENE);
					});

		this.tweens.add({
			targets: this.title,
			duration: 1500,
			alpha: {from: 0, to: 1},
			yoyo: true,
			ease: "Elastic",
			repeat: -1
		});

		this.credits = this.add.text(100, 500, "Developed by me and the boys");

	}
}