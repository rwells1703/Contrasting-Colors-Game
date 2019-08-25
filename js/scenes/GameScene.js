import {COLORS, SCENES, TEXTURE_SIZE} from '../constants.js'
import {Player} from '../entities/player.js'
import {Enemy} from '../entities/enemy.js'
import {PaintBlob} from '../entities/paintBlob.js'
import {loadLevel, positionToPx} from "../levels.js";

export class GameScene extends Phaser.Scene{
	constructor(){
		super({key: SCENES.GAMESCENE});
	}

	preload(){
		// Loads level 1
		this.load.text('level1', 'assets/levels/level1.bmp');
	}

	create(){
		// Array of platform sprites that make up the design of the level
		this.platforms = this.physics.add.staticGroup();
		loadLevel(this, this.platforms, 'level1');

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