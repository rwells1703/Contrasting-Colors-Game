import {LoadScene} from './scenes/LoadScene.js';
import {GameScene} from './scenes/GameScene.js';
import {GFS} from "./constants.js";

let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
    physics: {
        default: "arcade",
            arcade: {
                gravity: {y: GFS},
                debug: false
            }
    },
	scene: [LoadScene, GameScene]
}

let game = new Phaser.Game(config);
