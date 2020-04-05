import { WINDOW_WIDTH, WINDOW_HEIGHT } from './Constants.js'
import { MenuScene } from './scenes/MenuScene.js';
import { HelpScene } from './scenes/HelpScene.js';
import { GameScene } from './scenes/GameScene.js';

let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    scene: [MenuScene, HelpScene, GameScene]
}

let game = new Phaser.Game(config);