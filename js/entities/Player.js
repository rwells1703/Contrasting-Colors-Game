import { DirectionalColorEntity } from './ColorEntity.js';
import { PLAYER_MAX_HEALTH, JUMP_VEOLCITY, LOCOMOTIVE, FRICTION_COEFFICIENT, AIR_COEFFICIENT, DRAG_COEFFICIENT, X_DROP_OFF } from "../Constants.js";

export class Player extends DirectionalColorEntity {
    constructor (scene, color, x, y) {
        super();
        
        this.name = 'player';
        this.directional = true;

        this.health = PLAYER_MAX_HEALTH;

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.sprite = scene.physics.add.sprite(x, y, 'player');

        this.sprite.setBounce(0.15);

        this.changeColor(color);
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
            this.sprite.setVelocityY(JUMP_VEOLCITY);
        }

        let xvel = this.sprite.body.velocity.x;

        // Applies the direction of travel
        velta = LOCOMOTIVE*direction;

        if (this.sprite.body.touching.down) {
            // Applies friction to change of velocity if on ground
            velta = velta * FRICTION_COEFFICIENT;
        } else {
            // Otherwise applied air resistance
            velta = velta * AIR_COEFFICIENT;
        }

        // Changes player velocity by velta
        xvel = xvel + velta;
        // Applies drag to player velocity
        xvel = xvel * DRAG_COEFFICIENT;

        // If the magnitude of the velocity is below the critical value, just set it to 0
        if (Math.abs(xvel) < X_DROP_OFF) {
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