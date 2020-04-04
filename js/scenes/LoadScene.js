import { SCENES, COLORS } from '../Constants.js';

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({key: SCENES.LOAD_SCENE});
    }

    preload() {
        this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 48, frameHeight: 64});
        this.load.spritesheet('platform', 'assets/sprites/wall.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('paintBlob', 'assets/sprites/paintBlob.png', {frameWidth: 15, frameHeight: 15});
        this.load.spritesheet('enemy', 'assets/sprites/enemy.png', {frameWidth: 32, frameHeight: 64});

        this.load.image('healthbar', 'assets/healthbar.png');
        this.load.image('healthbar-outline', 'assets/healthbar-outline.png');

        this.load.spritesheet('fountain', 'assets/sprites/fountain.png', {frameWidth: 64, frameHeight: 64});

        this.load.audio('buttonSound', 'assets/sounds/to.wav');
    
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        this.loadAnimations("player", COLORS.WHITE, 1, 1, true);
        this.loadAnimations("enemy", COLORS.WHITE, 4, 4, true);
        this.loadAnimations("platform", COLORS.BLACK, 1, 1, false);
        this.loadAnimations("paintBlob", COLORS.WHITE, 1, 1, false);
        this.loadAnimations("fountain", COLORS.WHITE, 2, 1, false);

        this.scene.start(SCENES.MENU_SCENE);
        //this.scene.start(SCENES.GAME_SCENE);
    }

    loadAnimations(spriteKey, extraColorKey, framesPerColor, frameRate, directional) {
        let colors = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN, COLORS.ORANGE, COLORS.PURPLE, extraColorKey];
        let offset = 0;

        for (let i = 0; i < 7; i++) {
            if (directional) {
                var animationKeyExtensions = ["R", "L"];
            } else {
                var animationKeyExtensions = [""];
            }

            for (let animationKeyExtension of animationKeyExtensions) {
                this.anims.create({
                    key: spriteKey + colors[i] + animationKeyExtension,
                    frames: this.anims.generateFrameNumbers(spriteKey, {start: offset, end: offset + framesPerColor - 1}),
                    frameRate: frameRate,
                    repeat: -1
                });

                offset += framesPerColor;
            }
        }
    }
}
