import {LoadScene} from './scenes/LoadScene.js';
import {MenuScene} from './scenes/MenuScene.js';
import {HelpScene} from './scenes/HelpScene.js';
import {GameScene} from './scenes/GameScene.js';

import {GFS} from "./constants.js";

let config = {	
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	width: 1024, // 64 * 16
	height: 576, // 64 * 9
    physics: {
        default: "arcade",
            arcade: {
                gravity: {y: GFS},
                debug: true
            }
    },
	scene: [LoadScene, MenuScene, HelpScene, GameScene]
}

let game = new Phaser.Game(config);