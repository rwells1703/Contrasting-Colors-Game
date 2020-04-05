import { SCENES, GRAVITY, BLOB_TIMEOUT, BLOB_LAUNCH_SPEED, TEXTURE_SIZE, PLAYER_MAX_HEALTH, LEVEL_BACKGROUND_COLOR } from '../Constants.js';
import { loadLevelBmp, loadLevel } from "../loading/LoadLevel.js";
import { loadImages, parseSpriteSheets } from '../loading/LoadGraphics.js';
import { updatePlayerPlatformColliders, hurlBlob, doesColourDoDamage } from '../Utils.js'
import { HealthBar } from '../ui/HealthBar.js'
import { PaintPalette } from '../ui/PaintPalette.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.GAME_SCENE,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {y: GRAVITY},
                }
            }
        });
    }

    init(data) {
        // Gets the level number from the init data
        this.levelNum = data.levelNum;
    }

    preload() {
        loadLevelBmp(this);
        loadImages(this);
    }

    create() {
        parseSpriteSheets(this);

        this.levelComplete = false;

        // Create Platform group and array
        this.platforms = this.physics.add.staticGroup();
        this.platformsArr = [];
        
        // Create Enemy group and array
        this.enemies = this.physics.add.group();
        this.enemiesArr = [];

        // Create Fountain group and array
        this.fountains = this.physics.add.staticGroup();
        this.fountainsArr = [];

        // Create Blob group and array
        this.blobs = this.physics.add.group();//Add blobs using blobs.push, remove using blobs.pop
        this.blobsArr = [];

        let [level_width, level_height] = loadLevel(this, 'level' + this.levelNum);

        // Enemies can collide with platforms
        this.physics.add.collider(this.enemies, this.platforms);

        // Set blob timer so that the player cannot shoot blobs faster than a set rate
        this.blobTimer = BLOB_TIMEOUT;
        this.prevblobTimer = 0;

        // Hurl a blob
        this.input.on('pointerdown', pointer=>{
            // If enough time has passed since the last blob was fired
            if ((this.blobTimer - this.prevblobTimer) > BLOB_TIMEOUT) {
                hurlBlob(this, this.player.color, this.player.sprite.x, this.player.sprite.y, 
                    pointer.worldX, pointer.worldY, BLOB_LAUNCH_SPEED);
                
                // Reset the timer
                this.prevblobTimer = this.blobTimer;
            }
        });
        
        // Blob collides with enemy
        this.physics.add.overlap(this.enemies, this.blobs, (enemySprite, blobSprite)=>{
            //finding the enemy object corresponding to the enemy sprite that got hit
            //and also finding the blob object corresponding to the blob sprite that was hurled
            let enemyObj = this.enemiesArr.filter(enemyObj => enemyObj.sprite == enemySprite)[0];
            let blobObj = this.blobsArr.filter(blobObj => blobObj.sprite == blobSprite)[0];

            if (doesColourDoDamage(enemyObj.color, blobObj.color)){
                blobObj.destroy();
                enemyObj.damage(1);
            } else {
                blobObj.destroy();
            }
        });

        // Player walks over fountain
        this.physics.add.overlap(this.player.sprite, this.fountains, (playerSprite, fountainSprite)=>{
            let fountainObj = this.fountainsArr.filter(fountainObj => fountainObj.sprite == fountainSprite)[0];

            if (this.player.color != fountainObj.color) {
                this.player.changeColor(fountainObj.color);
                this.paintPalette.updateColors(fountainObj.color);
                updatePlayerPlatformColliders(this);
            }
        });

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(LEVEL_BACKGROUND_COLOR);
        this.cameras.main.startFollow(this.player.sprite);

        //can't see "outside" of the world boundaries where no game exists
        this.cameras.main.setBounds(0, 0, level_width*TEXTURE_SIZE, level_height*TEXTURE_SIZE);

        this.healthBar = new HealthBar(this);
                
        this.paintPalette = new PaintPalette(this);
        this.paintPalette.updateColors(this.player.color);

        this.playerPlatformColliders = [];
        updatePlayerPlatformColliders(this);
    }

    update(delta) {
        if (!this.levelComplete) {
            // If the level is continuing
            //update health bar every frame
            this.healthBar.setPercent(this.player.health/PLAYER_MAX_HEALTH);

            // Handles keyboard input every frame
            this.player.update();

            for (let enemy of this.enemiesArr) {
                enemy.update();
            }

            this.blobTimer = delta;
        } else {
            // If the level has been completed
            this.registry.destroy();
            this.events.off();

            // Close this level and begin the next level
            this.scene.start(SCENES.GAME_SCENE, {levelNum: this.levelNum + 1});
        }
    }
}