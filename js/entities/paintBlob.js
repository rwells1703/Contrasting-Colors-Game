export class PaintBlob {
    constructor (scene, color, x, y, velocityX, velocityY) {
        this.color = color;
        this.sprite = scene.physics.add.sprite(x ,y, 'paintBlob');
        this.sprite.setBounce(0.8);//Very bouncy - this may need changing.
        this.sprite.setVelocity(velocityX,velocityY);
    }
}