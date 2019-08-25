export class PaintBlob {
    constructor (group, color, x, y, velocityX, velocityY) {
        this.color = color;
        this.sprite = group.create(x ,y, 'paintBlob');
        this.sprite.setBounce(0.8);//Very bouncy - this may need changing.
        this.sprite.setVelocity(velocityX, velocityY);
    }
}