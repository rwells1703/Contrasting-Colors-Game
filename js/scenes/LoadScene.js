import {SCENES,COLORS} from "../constants.js";

export class LoadScene extends Phaser.Scene{
	constructor(){
		super({key: SCENES.LOADSCENE});
	}

	preload(){
		this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 48, frameHeight: 64});

		this.load.spritesheet('platform', 'assets/sprites/wall.png', {frameWidth: 64, frameHeight: 64});

        this.load.spritesheet('paintBlob', 'assets/sprites/paintBlob.png', {frameWidth: 15, frameHeight: 15});
        
        this.load.spritesheet('enemy', 'assets/sprites/enemy.png', {frameWidth: 32, frameHeight: 64});
        

        this.load.image('healthbar', 'assets/healthbar.png');
        this.load.image('healthbar-outline', 'assets/healthbar-outline.png');


//         this.load.spritesheet('fountain', 'assets/fountain.png', {frameWidth:, frameHeight: });

        // this.load.spritesheet('boss-enemy', 'assets/sprites/boss-enemy.png', {});
		this.load.audio('buttonSound', 'assets/sounds/to.wav');
	}

	create(){
        this.loadAnimations("player",COLORS.white,1,1,true);
        this.loadAnimations("enemy",COLORS.white,4,4,true);
        this.loadAnimations("platform",COLORS.black,1,1,false);
        this.loadAnimations("paintBlob",COLORS.white,1,1,false);
		this.scene.start(SCENES.MENUSCENE);
	}

	loadAnimations(spriteKey,extraColorKey,framesPerColor, frameRate,addLeftToo){
        let colors=[COLORS.red,COLORS.blue,COLORS.yellow,COLORS.green,COLORS.orange,COLORS.purple,extraColorKey];
        let offset=0;
        for(let i=0; i<7; i++){
            this.anims.create({
                key: spriteKey+colors[i]+"R",
                frames: this.anims.generateFrameNumbers(spriteKey,{start: offset, end: offset+framesPerColor-1}),
                frameRate: frameRate,
                repeat:-1
            });
            offset+=framesPerColor;
            if(addLeftToo){
                this.anims.create({
                    key: spriteKey+colors[i]+"L",
                    frames: this.anims.generateFrameNumbers(spriteKey,{start: offset, end: offset+framesPerColor-1}),
                    frameRate: frameRate,
                    repeat:-1
                });
                offset+=framesPerColor;
            }
        }
    }
}
