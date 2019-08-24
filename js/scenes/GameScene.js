import {Player} from '../entities/player.js'
import {PaintBlob} from '../entities/paintBlob.js'
import {Enemy} from '../entities/enemy.js'
import {COLORS} from '../constants.js'

export class GameScene extends Phaser.Scene{
	constructor(){
		super({
			key: "GameScene"
        });
	}

	create(){
        this.player = new Player(this, COLORS.red, 10, 400, 300);
        this.blobs = [];//Add blobs using blobs.push, remove using blobs.pop.
        this.enemies = [];//Add enemies using enemies.push, remove using enemies.pop.
//         this.blobs.push(new PaintBlob(this, COLORS.blue, 200, 150, 20,-150));
//         this.blobs.push(new PaintBlob(this, COLORS.blue, 200, 450, 20,-150));
//         this.enemies.push(new Enemy(this, COLORS.yellow, 200, 150, 20,-150));
        this.platforms = this.physics.add.staticGroup();
        this.physics.add.collider(this.player,this.platforms);
	}
	update(){
        this.player.update();

        for(let enemy of this.enemies){
            enemy.update();
        }
    }
}
