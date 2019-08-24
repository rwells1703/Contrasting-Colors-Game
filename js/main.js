import {LoadScene} from './scenes/LoadScene.js'
import {GameScene} from './scenes/GameScene.js'

let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [LoadScene, GameScene]
}

let game = new Phaser.Game(config);