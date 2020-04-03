import * as CON from "../Constants.js";
import {ColorEntity} from './ColorEntity.js'

export class Player extends ColorEntity {
    constructor (scene, color, x, y) {
        super();
        this.name = 'player';
        this.directional = true;
        this.health = CON.MAX_PLAYER_HEALTH;
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.changeColor(color);
        this.sprite.setBounce(0.15);
        this.cursors = scene.input.keyboard.createCursorKeys();
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

    damage(damValue) {
        this.health -= damValue;
        if (this.health <= 0) {
            this.health = 0;
        }
    }
}