export class LoadScene extends Phaser.Scene{
	constructor(){
		super({
			key: "LoadScene"
		});
	}

	preload(){
		this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('platform', 'assets/sprites/wall.png', {frameWidth: 64, frameHeight: 64});		
	}

	create(){
		this.scene.start('GameScene');
	}
}