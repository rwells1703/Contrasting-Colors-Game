import { SCENES } from '../Constants.js';
import { getRandomColor } from '../Utils.js';

export class WinScene extends Phaser.Scene {
    constructor() {
        super({key: SCENES.WIN_SCENE});
    }

    create() {
        WebFont.load({
            google: {families: ['Finger Paint']},
            active: () => {
                this.winTitle = this.add.text(100, 100, 'You win!!!', {font: '60px Finger Paint', color: getRandomColor()});
                this.winTitle.setInteractive()
                                .on('pointerover', () => this.winTitle.setColor(getRandomColor()))
                                .on('pointerout', () => this.winTitle.setColor(getRandomColor()))

                this.tweens.add({
                    targets: [this.winTitle],
                    duration: 1500,
                    alpha: {from: 0.3, to: 1},
                    yoyo: true,
                    repeat: -1
                });

                this.credits = this.add.text(100, 200, 'Developed by me and the boys', {font: '22px Finger Paint', color: getRandomColor()})
                this.credits.setInteractive()
                            .on('pointerover', () => this.credits.setColor(getRandomColor()))
                            .on('pointerout', () => this.credits.setColor(getRandomColor()))

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