import {SCENES} from "../constants.js";

export class LoadScene extends Phaser.Scene{
	constructor(){
		super({key: SCENES.LOADSCENE});
	}

	preload(){
		this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('platform', 'assets/sprites/wall.png', {frameWidth: 64, frameHeight: 64});		
        this.load.spritesheet('paintBlob', 'assets/sprites/paintBlob.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('enemy', 'assets/sprites/enemy.png', {frameWidth: 48, frameHeight: 48});

        this.load.audio('buttonSound', 'assets/sounds/to.wav');
	}

	create(){
		this.scene.start(SCENES.MENUSCENE);
	}
}
