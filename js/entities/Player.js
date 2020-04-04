import { DirectionalColorEntity } from './ColorEntity.js';
import { MAX_PLAYER_HEALTH, JUMPVEOLCITY, LOCOMOTIVE, FRICTCOEFF, AIRCOEFF, DRAGCOEFF, XDROPOFF } from "../Constants.js";

export class Player extends DirectionalColorEntity {
    constructor (scene, color, x, y) {
        super();
        this.name = 'player';
        this.directional = true;
        this.health = MAX_PLAYER_HEALTH;
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.changeColor(color);
        this.sprite.setBounce(0.15);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.setAnimation(true);
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
            this.sprite.setVelocityY(JUMPVEOLCITY);
        }

        let xvel = this.sprite.body.velocity.x;

        // Applies the direction of travel
        velta = LOCOMOTIVE*direction;

        if (this.sprite.body.touching.down) {
            // Applies friction to change of velocity if on ground
            velta = velta * FRICTCOEFF;
        } else {
            // Otherwise applied air resistance
            velta = velta * AIRCOEFF;
        }

        // Changes player velocity by velta
        xvel = xvel + velta;
        // Applies drag to player velocity
        xvel = xvel * DRAGCOEFF;

        // If the magnitude of the velocity is below the critical value, just set it to 0
        if (Math.abs(xvel) < XDROPOFF) {
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