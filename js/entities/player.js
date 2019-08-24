export class Player {
    constructor (scene, color, health, x, y) {
        this.color = color;
        this.health = health;
        this.sprite = scene.add.sprite(x, y, 'player');
    }
}