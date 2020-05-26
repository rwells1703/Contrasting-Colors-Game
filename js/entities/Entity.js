export class Entity {
    destroy() {
        this.sprite.destroy();
        //delete this.arr[this.arr.indexOf(this)];
        //this.arr[this.arr.indexOf(this)] = null;
        this.arr.splice(this.arr.indexOf(this), 1);

        console.log(this.arr);
    }
}