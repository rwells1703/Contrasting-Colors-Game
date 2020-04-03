import { SCENES, GFS, BLOBTIMEOUT, PBLOBLAUNCH, TEXTURE_SIZE, MAX_PLAYER_HEALTH } from '../Constants.js';
import { loadLevel } from "../LoadLevel.js";
import { updatePlayerPlatformColliders, hurlBlob, doesColourDoDamage, destroyEntity } from '../entities/Utils.js'
import { HealthBar } from '../HealthBar.js'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.GAMESCENE,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {y: GFS},
                }
            },
            backgroundColor: Phaser.Display.Color.blue
        });
    }

    init(data) {
        this.levelNum = data.levelNum;
    }

    preload() {
        // Loads a 24-bit bitmap image for the level
        this.load.text('level' + this.levelNum, 'assets/levels/level' + this.levelNum + '.bmp');
    }

    create() {
        this.levelComplete = false;

        // Platform sprites that make up the design of the level
        this.platforms = this.physics.add.staticGroup();
        this.platformsArr = [];
        
        // Create Enemy group and array
        this.enemies = this.physics.add.group();
        this.enemiesArr = [];

        // Enemies can collide with platforms
        this.physics.add.collider(this.enemies, this.platforms);

        //Create fountains group and array
        this.fountains = this.physics.add.staticGroup();
        this.fountainsArr = [];

        // Set blobCounter so that the player can shoot
        this.blobCounter = BLOBTIMEOUT;
        this.prevBlobCounter = 0;

        let [level_width, level_height] = loadLevel(this, 'level' + this.levelNum);

        this.playerPlatformColliders = [];
        updatePlayerPlatformColliders(this);

        //create Blob group
        this.blobs = this.physics.add.group();//Add blobs using blobs.push, remove using blobs.pop
        this.blobsArr = [];
        this.input.on('pointerdown', pointer=>{
            if ((this.blobCounter - this.prevBlobCounter) > BLOBTIMEOUT) {
                this.blobsArr.push(hurlBlob(this.blobsArr, this.blobs, this.player.color,
                                            this.player.sprite.x, this.player.sprite.y, 
                                            pointer.worldX, pointer.worldY, PBLOBLAUNCH)
                );
                this.prevBlobCounter = this.blobCounter;
            }
        });

        //blob bounces off platforms
        this.physics.add.collider(this.blobs, this.platforms, (blobSprite, platformSprite)=>{
            let theBlobObj = this.blobsArr.filter(blobObj => blobObj.sprite == blobSprite)[0];
            let thePlatformObj = this.platformsArr.filter(platformObj => platformObj.sprite == platformSprite)[0];

            if (doesColourDoDamage(thePlatformObj.color, theBlobObj.color)){
                destroyEntity(theBlobObj, this.blobsArr);
            } else if (thePlatformObj.color == theBlobObj.color) {
                // do nothing
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

            if (doesColourDoDamage(enemyColor, blobColor)){
                destroyEntity(theBlobObj, this.blobsArr);

                theEnemyObj.damage(1);
            } else {
                theBlobObj.destroy();
                destroyEntity(theBlobObj, this.blobsArr);
            }
        });

        //blob hitting player
        this.physics.add.overlap(this.player.sprite, this.blobs, (playerSprite, blobSprite)=>{
            let playerColor = this.player.color;
            let theBlobObj = this.blobsArr.filter(blobObj => blobObj.sprite == blobSprite)[0];
            let blobColor = theBlobObj.color;

            this.player.damage(1);
        });

        // player walking over fountain
        this.physics.add.overlap(this.player.sprite, this.fountains, (playerSprite, fountainSprite)=>{
            let theFountainObj = this.fountainsArr.filter(fountainObj => fountainObj.sprite == fountainSprite)[0];
            this.player.changeColor(theFountainObj.color);
            updatePlayerPlatformColliders(this);
        });

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#000e1f");
        this.cameras.main.startFollow(this.player.sprite);
        //can't see "outside" of the world boundaries where no game exists
        this.cameras.main.setBounds(0, 0, level_width*TEXTURE_SIZE, level_height*TEXTURE_SIZE);

        this.HealthBar = new HealthBar(this);
        this.player.health = MAX_PLAYER_HEALTH;
    }

    update(delta) {
        if (!this.levelComplete) {
            // If the level is continuing
            //update health bar every frame
            this.HealthBar.setPercent(this.player.health/MAX_PLAYER_HEALTH);
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
            this.scene.start(SCENES.GAMESCENE, {levelNum: this.levelNum + 1});
        }
    }
}