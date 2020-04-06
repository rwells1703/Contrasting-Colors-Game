import { SCENES } from '../Constants.js';
import { getRandomColor } from '../Utils.js';

export class HelpScene extends Phaser.Scene {
    constructor() {
        super({key: SCENES.HELP_SCENE});
    }

    create() {
        WebFont.load({
            google: {families: ['Finger Paint']},
            active: () => {
                this.helpTitle = this.add.text(100, 100, 'Help', {font: '60px Finger Paint', color: getRandomColor()});
                this.helpTitle.setInteractive()
                                .on('pointerover', () => this.helpTitle.setColor(getRandomColor()))
                                .on('pointerout', () => this.helpTitle.setColor(getRandomColor()))

                this.tweens.add({
                    targets: [this.helpTitle],
                    duration: 1500,
                    alpha: {from: 0.3, to: 1},
                    yoyo: true,
                    repeat: -1
                });

                this.helpText = this.add.text(100, 200, 'Splat! Spling! Slosh!\nThe sassy spraycans are taking over!\nPoor paintbrushes...', {font: '22px Finger Paint', color: getRandomColor()});
                this.helpText.setInteractive()
                                .on('pointerover', () => this.helpText.setColor(getRandomColor()))
                                .on('pointerout', () => this.helpText.setColor(getRandomColor()))

                this.btnSoundFX = this.sound.add('ButtonSound');
        
                this.backButton = this.add.text(100, 450, 'Back to main menu', {font: '35px Finger Paint', color: getRandomColor()});
                this.backButton.setInteractive()
                                .on('pointerover', () => this.backButton.setColor(getRandomColor()))
                                .on('pointerout', () => this.backButton.setColor(getRandomColor()))
                                .on('pointerdown', () => {
                                    this.btnSoundFX.play();
                                    this.scene.start(SCENES.MENU_SCENE);
                                });
            }
        });
    }
}