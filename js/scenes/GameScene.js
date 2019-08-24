import {COLORS, SCENES, TEXTURE_SIZE} from '../constants.js'
import {level1} from '../levels.js'
import {Player} from '../entities/player.js'
import {Enemy} from '../entities/enemy.js'
import {PaintBlob} from '../entities/paintBlob.js'

export class GameScene extends Phaser.Scene{
	constructor(){
		super({key: SCENES.GAMESCENE});
	}

	create(){
		// Array of platform sprites that make up the design of the level
		this.platforms = this.physics.add.staticGroup();
		loadLevel(this, this.platforms);
		
		// Create the player
		this.player = new Player(this, COLORS.red, 10, positionToPx(7), positionToPx(2));

		this.physics.add.collider(this.player.sprite, this.platforms);
		this.blobs = [];//Add blobs using blobs.push, remove using blobs.pop.
		this.enemies = [];//Add enemies using enemies.push, remove using enemies.pop.

		//this.cameras.main.setBounds(0, 0, level1.width, level1.height);
		this.cameras.main.startFollow(this.player.sprite);
	}

	update(){
        this.player.update();

        for(let enemy of this.enemies){
            enemy.update();
        }
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
					platforms.create(positionToPx(j), positionToPx(i), 'platform');
				}
				
			j += 1;
		}

		i += 1;
	}
}

function positionToPx(position) {
	return TEXTURE_SIZE/2 + position*TEXTURE_SIZE
}