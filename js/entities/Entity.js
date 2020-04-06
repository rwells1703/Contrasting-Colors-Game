export class Entity {
    destroy() {
        this.sprite.destroy();
        this.arr.splice(this.arr.indexOf(this), 1);
    }
}