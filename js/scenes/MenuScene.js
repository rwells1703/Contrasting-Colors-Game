import {SCENES} from "../constants.js";

export class MenuScene extends Phaser.Scene{
	constructor(){
		super({key: SCENES.MENUSCENE});
	}

	create(){
		this.title = this.add.text(100, 100, "Main Menu", {font:"40px Impact"});



		this.startButton = this.add.text(100, 200, "Start game", {font:"20px Impact"});
		this.startButton.setInteractive()
					.on("pointerover", ()=>this.startButton.setColor("red"))
					.on("pointerout", ()=>this.startButton.setColor("white"))
					.on("pointerdown", ()=>this.scene.start(SCENES.GAMESCENE));


		this.helpButton = this.add.text(100, 230, "Help", {font:"20px Impact"});
		this.helpButton.setInteractive()
					.on("pointerover", ()=>this.helpButton.setColor("blue"))
					.on("pointerout", ()=>this.helpButton.setColor("white"));

		console.log(this.title);
		this.tweens.add({
			targets: this.title,
			duration: 1500,
			alpha: {from: 0, to: 1},
			yoyo: true,
			ease: "Elastic",
			repeat: -1
		});

	}
}