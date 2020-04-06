import { SCENES, DEBUG } from '../Constants.js';
import { getRandomColor } from '../Utils.js';
import { loadImages } from '../loading/LoadGraphics.js';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: SCENES.MENU_SCENE});
    }

    preload() {
        this.load.audio('ButtonSound', 'assets/sounds/to.wav');
        this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        loadImages(this);
    }

    create() {
        if (DEBUG) {
            this.scene.start(SCENES.GAME_SCENE, {levelNum: 'Debug'});
        }
        
        WebFont.load({
            google: {families: ['Finger Paint']},
            active: () => {
                this.gameTitle = this.add.text(100, 100, 'Contrasting Colors', {font: '60px Finger Paint', color: getRandomColor()});
                this.gameTitle.setInteractive()
                                .on('pointerover', () => this.gameTitle.setColor(getRandomColor()))
                                .on('pointerout', () => this.gameTitle.setColor(getRandomColor()))

                this.tweens.add({
                    targets: [this.gameTitle],
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

                this.startButton = this.add.text(100, 350, 'Start', {font: '35px Finger Paint', color: getRandomColor()});
                this.startButton.setInteractive()
                                .on('pointerover', () => this.startButton.setColor(getRandomColor()))
                                .on('pointerout', () => this.startButton.setColor(getRandomColor()))
                                .on('pointerdown', () => {
                                    this.btnSoundFX.play();
                                    this.scene.start(SCENES.GAME_SCENE, {levelNum: 1});
                                });
        
        
                this.helpButton = this.add.text(100, 450, 'Help', {font: '35px Finger Paint', color: getRandomColor()});
                this.helpButton.setInteractive()
                                .on('pointerover', () => this.helpButton.setColor(getRandomColor()))
                                .on('pointerout', () => this.helpButton.setColor(getRandomColor()))
                                .on('pointerdown', () => {
                                    this.btnSoundFX.play();
                                    this.scene.start(SCENES.HELP_SCENE);
                                });
            }
        });
    }
}