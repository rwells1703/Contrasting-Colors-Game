export class Enemy {
    constructor (scene, color, health, x, y) {
        this.color = color;
        this.health = health;
        this.sprite = scene.physics.add.sprite(x, y, 'enemy');
        this.sprite.setBounce(0.2);
    }
    update(){//Called each frame. Some enemy AI could be put here.
        
    }
}
