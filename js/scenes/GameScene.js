import * as CON from '../constants.js'
import {Player} from '../entities/player.js'
import * as Enemies from '../entities/enemy.js'
import {PaintBlob} from '../entities/paintBlob.js'
import {loadLevel, positionToPx} from "../levels.js";
import * as Utils from '../entities/utils.js'
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
		// Platform sprites that make up the design of the level
		this.platforms = this.physics.add.staticGroup();
		this.platformsArr = [];
		
		//create Enemy group
		this.enemies = this.physics.add.group();
		this.enemiesArr = [];
		this.physics.add.collider(this.enemies, this.platforms);

		let [level_width, level_height] = loadLevel(this, 'level1');

		this.physics.add.collider(this.player.sprite, this.platforms, (playerSprite, platformSprite)=>{
			let playerColor = this.player.color;
			let platformObj = this.platformsArr.filter(platformObj=>platformObj.sprite==platformSprite)[0];
			let platformColor = platformObj.color;

			if (playerColor==platformColor){
				platformObj.sprite.body.checkCollision.none=true;
				console.log("same color");
			}else if(Utils.doesColourDoDamage(playerColor,platformColor)){
				this.player.damage(1);
			}else{
				console.log("not same color");
			}

			// console.log(playerColor);
			// console.log(platformColor);
		});
		

		//create Blob group
		this.blobs = this.physics.add.group();//Add blobs using blobs.push, remove using blobs.pop
		this.blobsArr = [];
		this.input.on('pointerdown',pointer=>{
				this.blobsArr.push(Utils.hurlBlob(this, this.blobs, this.player.color,
											this.player.sprite.x, this.player.sprite.y, 
											pointer.worldX, pointer.worldY, CON.PBLOBLAUNCH)
				);
		});

		//blob bounces off platforms
		this.physics.add.collider(this.blobs,this.platforms, (blobSprite,platformSprite)=>{
			console.log(blobSprite)
			console.log(this.blobsArr.filter(blobObj=>blobObj.sprite==blobSprite)[0]);

			let theBlobObj = this.blobsArr.filter(blobObj=>blobObj.sprite==blobSprite)[0];
			let thePlatformObj = this.platformsArr.filter(platformObj=>platformObj.sprite==platformSprite)[0];


			if(thePlatformObj.color == theBlobObj.color){

			}else if(Utils.doesColourDoDamage(thePlatformObj.color,theBlobObj.color)){
				Utils.destroyEntity(theBlobObj,this.blobsArr);
			}else if (theBlobObj.checkTooSlow()){
				Utils.destroyEntity(theBlobObj,this.blobsArr);
			}
		});


		

		//blob hitting enemy
		this.physics.add.overlap(this.enemies, this.blobs, (enemySprite, blobSprite)=>{
			//finding the enemy object corresponding to the enemy sprite that got hit
			//and also finding the blob object corresponding to the blob sprite that was hurled
			let theEnemyObj = this.enemiesArr.filter(enemyObj=>enemyObj.sprite==enemySprite)[0];
			let theBlobObj = this.blobsArr.filter(blobObj=>blobObj.sprite==blobSprite)[0];

			let enemyColor = theEnemyObj.color;
			let blobColor = theBlobObj.color;


			console.log(this.blobsArr);
			if(enemyColor == blobColor){

			}else if(Utils.doesColourDoDamage(enemyColor,blobColor)){
				Utils.destroyEntity(theBlobObj,this.blobsArr);

				theEnemyObj.damage(1);
			}else{
				theBlobObj.destroy();
				Utils.destroyEntity(theBlobObj,this.blobsArr);

			}

			//TODO: handle logic with the colors to determine what happens
		});



		//blob hitting player
		this.physics.add.overlap(this.player.sprite, this.blobs, (playerSprite, blobSprite)=>{
			let playerColor = this.player.color;
			let theBlobObj = this.blobsArr.filter(blobObj=>blobObj.sprite==blobSprite)[0];
			let blobColor = theBlobObj.color;

			// console.log(playerColor);
			// console.log(blobColor);
		});




		//Create fountains group and array
		this.fountainsArr = [] ;
		this.fountains = this.physics.add.staticGroup();
		this.physics.add.overlap(this.player,this.fountains,changePlayerColor,null,this);



		this.cameras.main.startFollow(this.player.sprite);
		//can't see "outside" of the world boundaries where no game exists
		this.cameras.main.setBounds(0, 0, level_width*CON.TEXTURE_SIZE, level_height*CON.TEXTURE_SIZE);
		


		this.healthBar = new HealthBar(this);
		this.player.health = CON.MAX_PLAYER_HEALTH;
	}

	update(delta){
		//update health bar every frame
		this.healthBar.setPercent(this.player.health/CON.MAX_PLAYER_HEALTH);
		//handles keyboard input every frame
        this.player.update(this, delta);
        for(let enemy of this.enemiesArr){
            enemy.update(delta);
        }
    }
}

function changePlayerColor(player,fountain){
	let theFountainObj = this.platformsArr.filter(platformObj=>platformObj.sprite==platformSprite)[0];

	let relevantWalls = this.platformsArr.filter(platformObj=>platformObj.color==player.color);

	relevantWalls.sprite.body.checkCollision.none=false;

	this.player.changeColor(theFountainObj.color);
}
