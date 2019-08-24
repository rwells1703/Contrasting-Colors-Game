import {Player} from '../entities/player.js'
import {COLORS} from '../constants.js'

export class GameScene extends Phaser.Scene{
	constructor(){
		super({
			key: "GameScene"
        });
	}

	create(){
        let player = new Player(this, COLORS.red, 10, 400, 300);
	}
}