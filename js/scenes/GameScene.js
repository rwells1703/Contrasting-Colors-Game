import * as CON from '../constants.js'
//import {level1} from '../levels.js'
import {Player} from '../entities/player.js'
import * as Enemies from '../entities/enemy.js'
import {PaintBlob} from '../entities/paintBlob.js'
import {loadLevel, positionToPx} from "../levels.js";
import * as utils from '../entities/utils.js'
import {HealthBar} from '../healthBar.js'

export class GameScene extends Phaser.Scene{
	constructor(){
		super({key: CON.SCENES.GAMESCENE});
	}

	preload(){
		// Loads level 1
		this.load.text('level1', 'assets/levels/level1.bmp');
	}

	create(){
		// Array of platform sprites that make up the design of the level
		this.platforms = this.physics.add.staticGroup();
		
		let [level_width, level_height] = loadLevel(this, 'level1');

		this.physics.add.collider(this.player.sprite, this.platforms);

		this.blobs = this.physics.add.group();//Add blobs using blobs.push, remove using blobs.pop.
		this.input.on('pointerdown',function (pointer){
			utils.hurlBlob(this,this.blobs,this.player.color,this.player.sprite.x,this.player.sprite.y,pointer.worldX,pointer.worldY,CON.PBLOBLAUNCH)
		},this);

		
		//create Enemy group
		this.enemies = this.physics.add.group();
		this.enemiesArr = [];
		this.enemiesArr.push(new Enemies.Enemy(this.enemies, CON.COLORS.green, 100, positionToPx(9), positionToPx(2)));
		this.physics.add.collider(this.enemies, this.platforms);

		//Create fountains group
		this.fountains = this.physics.add.staticGroup();
		this.physics.add.overlap(this.player,this.fountains,null,this);


		// this.physics.add.overlap(this.enemies, this.blobs, EntityLogic.checkColors);

		this.cameras.main.startFollow(this.player.sprite);
		this.cameras.main.setBounds(0, 0, level_width*CON.TEXTURE_SIZE, level_height*CON.TEXTURE_SIZE);
		

		/*this.input.on('pointerdown',function (pointer){
			utils.hurlBlob(this,this.blobs,this.player.color,this.player.sprite.x,this.player.sprite.y,pointer.x,pointer.y,CON.PBLOBLAUNCH,CON.BLOBOFFSETCOEFF)
		},this)*/

		// console.log(this.cameras.main.x);
		// console.log(this.cameras.main.y);
		// console.log(this.cameras.main.width);
		// console.log(this.cameras.main.height);
		// console.log(this.cameras.main.worldView);


		this.healthBar = new HealthBar(this);
		this.player.health = 2;
	}

	update(){
		this.healthBar.setPercent(this.player.health/CON.MAX_PLAYER_HEALTH);
        this.player.update(this);
        for(let enemy of this.enemiesArr){
            enemy.update();
        }
    }
}

function changePlayerColor(player,fountain){
	this.player.changeColor(fountain.data.color());
}
