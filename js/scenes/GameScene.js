import * as CON from '../constants.js'
import {loadLevel, positionToPx} from "../levels.js";
import * as Utils from '../entities/Utils.js'
import {HealthBar} from '../healthBar.js'
import {Fountain} from '../entities/Fountain.js'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CON.SCENES.GAMESCENE,
            physics: {
                default: "arcade",
                    arcade: {
                        gravity: {y: CON.GFS},
                        debug: true
                    }
            }
        });
    }

    init(data) {
        console.log(data);
        //??????? Surely just check initial levelnum OR why check at all, level 1 is passed in MenuScenes begin button!!
        if (Object.entries(data).length === 0 && obj.constructor === Object){
            this.levelNum = 1;
        } else {
            this.levelNum = data.levelNum;
        }
    }

    preload() {
        this.load.text('level' + this.levelNum, 'assets/levels/level1.bmp');
        console.log("Level: " + this.levelNum);
    }

    create() {
        this.levelComplete = false;

        // Platform sprites that make up the design of the level
        this.platforms = this.physics.add.staticGroup();
        this.platformsArr = [];
        
        // Create Enemy group
        this.enemies = this.physics.add.group();
        this.enemiesArr = [];

        // Enemies can collide with platforms
        this.physics.add.collider(this.enemies, this.platforms);

        // Set blobCounter so that the player can shoot
        this.blobCounter = CON.BLOBTIMEOUT;
        this.prevBlobCounter = 0;

        let [level_width, level_height] = loadLevel(this, 'level' + this.levelNum);

        console.log(this.platforms.children.entries);
        console.log(this.platformsArr);
        this.physics.add.collider(this.player.sprite, this.platforms, (playerSprite, platformSprite)=>{
            let platformObj = this.platformsArr.filter(platformObj => platformObj.sprite == platformSprite)[0];

            if (this.player.color == platformObj.color) {
                // Allows player to move through platforms of the same color to it
                platformObj.sprite.body.checkCollision.none = false;
            } else if (Utils.doesColourDoDamage(this.player.color, platformObj.color)) {
                this.player.damage(1);
            }
        });

        //create Blob group
        this.blobs = this.physics.add.group();//Add blobs using blobs.push, remove using blobs.pop
        this.blobsArr = [];
        this.input.on('pointerdown', pointer=>{
            if ((this.blobCounter-this.prevBlobCounter) > CON.BLOBTIMEOUT) {
                this.blobsArr.push(Utils.hurlBlob(this.blobsArr, this.blobs, this.player.color,
                                            this.player.sprite.x, this.player.sprite.y, 
                                            pointer.worldX, pointer.worldY, CON.PBLOBLAUNCH)
                );
                this.prevBlobCounter = this.blobCounter;
            }
        });

        //blob bounces off platforms
        this.physics.add.collider(this.blobs, this.platforms, (blobSprite, platformSprite)=>{
            //console.log(blobSprite);
            //console.log(this.blobsArr.filter(blobObj => blobObj.sprite == blobSprite)[0]);

            let theBlobObj = this.blobsArr.filter(blobObj => blobObj.sprite == blobSprite)[0];
            let thePlatformObj = this.platformsArr.filter(platformObj => platformObj.sprite == platformSprite)[0];

            if (Utils.doesColourDoDamage(thePlatformObj.color, theBlobObj.color)){
                Utils.destroyEntity(theBlobObj, this.blobsArr);
            } else {
                theBlobObj.addBounce();
            }
        });
        
        //blob hitting enemy
        this.physics.add.overlap(this.enemies, this.blobs, (enemySprite, blobSprite)=>{
            //finding the enemy object corresponding to the enemy sprite that got hit
            //and also finding the blob object corresponding to the blob sprite that was hurled
            let theEnemyObj = this.enemiesArr.filter(enemyObj => enemyObj.sprite == enemySprite)[0];
            let theBlobObj = this.blobsArr.filter(blobObj => blobObj.sprite == blobSprite)[0];

            let enemyColor = theEnemyObj.color;
            let blobColor = theBlobObj.color;

            //console.log(this.blobsArr);
            if (Utils.doesColourDoDamage(enemyColor, blobColor)){
                Utils.destroyEntity(theBlobObj, this.blobsArr);

                theEnemyObj.damage(1);
            } else {
                theBlobObj.destroy();
                Utils.destroyEntity(theBlobObj, this.blobsArr);
            }
        });

        //blob hitting player
        this.physics.add.overlap(this.player.sprite, this.blobs, (playerSprite, blobSprite)=>{
            let playerColor = this.player.color;
            let theBlobObj = this.blobsArr.filter(blobObj => blobObj.sprite == blobSprite)[0];
            let blobColor = theBlobObj.color;

            this.player.damage(1);
        });

        //Create fountains group and array
        this.fountainsArr = [];
        this.fountains = this.physics.add.staticGroup();
        this.fountainsArr.push(new Fountain(this.fountains, CON.COLORS.red, positionToPx(42), positionToPx(10)));
        this.physics.add.overlap(this.player.sprite, this.fountains, (playerSprite, fountainSprite)=>{
            let theFountainObj = this.fountainsArr.filter(fountainObj => fountainObj.sprite == fountainSprite)[0];
            let relevantWalls = this.platformsArr.filter(platformObj => platformObj.color == theFountainObj.color);
            let otherWalls = this.platformsArr.filter(platformObj => platformObj.color != theFountainObj.color);
            
            // console.log(theFountainObj.color);
            for (let wall of relevantWalls) {
                wall.sprite.body.checkCollision.none = true;
            }

            for (let wall of otherWalls) {
                wall.sprite.body.checkCollision.none = false;
            }

            this.player.changeColor(theFountainObj.color);
        });

        this.cameras.main.startFollow(this.player.sprite);
        //can't see "outside" of the world boundaries where no game exists
        this.cameras.main.setBounds(0, 0, level_width*CON.TEXTURE_SIZE, level_height*CON.TEXTURE_SIZE);

        this.healthBar = new HealthBar(this);
        this.player.health = CON.MAX_PLAYER_HEALTH;
    }

    update(delta) {
        if (!this.levelComplete) {
            // If the level is continuing
            //update health bar every frame
            this.healthBar.setPercent(this.player.health/CON.MAX_PLAYER_HEALTH);
            //handles keyboard input every frame
            this.player.update(this, delta);
            for (let enemy of this.enemiesArr) {
                enemy.update(delta);
            }
            this.blobCounter = delta;
        } else {
            // If the level has been completed
            this.registry.destroy();
            this.events.off();

            // Close this level and begin the next level
            this.scene.start(CON.SCENES.GAMESCENE, {levelNum: this.levelNum + 1});
        }
    }
}