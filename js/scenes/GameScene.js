import {Player} from '../entities/player.js'
import {COLORS, TEXTURE_SIZE} from '../constants.js'
import {level1} from '../levels.js'

export class GameScene extends Phaser.Scene{
	constructor(){
		super({
			key: "GameScene"
		});
	}

	preload(){
	}

	create(){
		// Array of platform sprites that make up the design of the level
		let platforms = [];
		loadLevel(this, platforms);
		// Create the player
		let player = new Player(this, COLORS.red, 10, positionToPx(7), positionToPx(4));
	}
}

// Loads the positions of the platforms in the platforms array
function loadLevel(scene, platforms){
	let i = 0;
	while (i < level1.height) {
		let j = 0;
		while (j < level1.width) {
			if (level1.platforms[i][j] == 1)
				{
					platforms.push(scene.add.sprite(positionToPx(j), positionToPx(i), 'platform'));
				}
				
			j += 1;
		}

		i += 1;
	}
}

function positionToPx(position) {
	return TEXTURE_SIZE/2 + position*TEXTURE_SIZE
}