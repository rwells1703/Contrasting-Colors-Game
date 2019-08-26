import * as CON from "../constants.js";
import {ColorEntity} from './colorEntity.js'

export class Player extends ColorEntity {
    constructor (scene, color, health, x, y) {
        super();
        this.health = health;
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.changeColor(color);
        this.sprite.setBounce(0.15);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.sprite.data = this;
    }

	update() {
		let direction;
		let velta;

		// Gets the direction of player movement from the arrow keys
		if (this.cursors.left.isDown) {
			direction = -1;
		} else if (this.cursors.right.isDown) {
			direction = 1;
		} else {
			direction = 0;
		}

		// Applies jumping velocity if on the floor
		if (this.cursors.up.isDown && this.sprite.body.touching.down) {
			this.sprite.setVelocityY(CON.JUMPVEOLCITY);
		}

		let xvel = this.sprite.body.velocity.x;

		// Applies the direction of travel
		velta = CON.LOCOMOTIVE*direction;

		if (this.sprite.body.touching.down) {
			// Applies friction to change of velocity if on ground
			velta = velta * CON.FRICTCOEFF;
		} else {
			// Otherwise applied air resistance
			velta = velta * CON.AIRCOEFF;
		}

		// Changes player velocity by velta
		xvel = xvel + velta;
		// Applies drag to player velocity
		xvel = xvel * CON.DRAGCOEFF;

		// If the magnitude of the velocity is below the critical value, just set it to 0
		if (Math.abs(xvel) < CON.XDROPOFF) {
			xvel = 0;
		}

		// Apply velocity to the sprite itself
		this.sprite.setVelocityX(xvel);

        this.setAnimation();
	}

	getAnimationSuperName(){return "player";}
}
