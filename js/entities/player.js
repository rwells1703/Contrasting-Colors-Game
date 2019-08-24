export class Player {
    constructor (scene, color, health, x, y) {
        this.color = color;
        this.health = health;
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
    }
}
