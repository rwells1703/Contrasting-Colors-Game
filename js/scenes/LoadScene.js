export class LoadScene extends Phaser.Scene{
	constructor(){
		super({
			key: "LoadScene"
		});
	}

	preload(){
        this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 48, frameHeight: 48});		
	}

	create(){
		this.scene.start('GameScene');
	}
}