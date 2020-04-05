import { SCENES, TITLE_FONT, BUTTON_FONT, DEBUG } from "../Constants.js";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: SCENES.MENU_SCENE});
    }

    preload() {
        if (DEBUG) {
            this.scene.start(SCENES.GAME_SCENE, {levelNum: 1});
        }
        
        this.load.audio('ButtonSound', 'assets/sounds/to.wav');
        this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        WebFont.load({
            google: {families: ['Finger Paint']},
            active: ()=> {
                this.gameTitle = this.add.text(100, 350, 'Contrasting Colors', {font: "50px Finger Paint", fontColor:"red"});
            }
        });

        this.btnSoundFX = this.sound.add("ButtonSound");

        this.title = this.add.text(100, 100, "Main Menu", TITLE_FONT);

        this.startButton = this.add.text(100, 200, "Start game", BUTTON_FONT);
        this.startButton.setInteractive()
                        .on("pointerover", () => this.startButton.setColor("red"))
                        .on("pointerout", () => this.startButton.setColor("white"))
                        .on("pointerdown", () => {
                            this.btnSoundFX.play();
                            this.scene.start(SCENES.GAME_SCENE, {levelNum: 1});
                        });


        this.helpButton = this.add.text(100, 230, "Help", BUTTON_FONT);
        this.helpButton.setInteractive()
                        .on("pointerover", () => this.helpButton.setColor("blue"))
                        .on("pointerout", () => this.helpButton.setColor("white"))
                        .on("pointerdown", () => {
                            this.btnSoundFX.play();
                            this.scene.start(SCENES.HELP_SCENE);
                        });

        this.tweens.add({
            targets: [this.title, this.gameTitle],
            duration: 1500,
            alpha: {from: 0, to: 1},
            yoyo: true,
            ease: "Elastic",
            repeat: -1
        });

        this.credits = this.add.text(100, 500, "Developed by me and the boys");
    }
}