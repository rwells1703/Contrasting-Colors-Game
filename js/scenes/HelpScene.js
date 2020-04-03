import * as CON from '../Constants.js';

export class HelpScene extends Phaser.Scene {
    constructor() {
        super({key: "HelpScene"});
    }

    create() {
        console.log("yes");
        this.btnSoundFX = this.sound.add("buttonSound");

        this.title = this.add.text(100, 100, "Help", CON.TITLE_FONT);

        this.helpText = this.add.text(100, 200, "Splat! Spling! Slosh!\nThe sassy spraycans are taking over. Poor paintbrushes!");

        this.tweens.add({
            targets: [this.title, this.gameTitle],
            duration: 1500,
            alpha: {from: 0, to: 1},
            yoyo: true,
            ease: "Elastic",
            repeat: -1
        });

        this.backBtn = this.add.text(100, 500, "Back to main menu", CON.BUTTON_FONT);
        this.backBtn.setInteractive()
                    .on("pointerover", () => this.backBtn.setColor("green"))
                    .on("pointerout", () => this.backBtn.setColor("white"))
                    .on("pointerdown", () => {
                        this.btnSoundFX.play();
                        this.scene.start(CON.SCENES.MENUSCENE);
                    });
    }
}