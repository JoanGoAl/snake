import { Vec, isCollision } from './helpers.js'


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")

let currentColor


class Food {
    constructor(cells, cellSize) {
        this.pos = new Vec(
            Math.trunc(Math.random() * cells) * cellSize,
            Math.trunc(Math.random() * cells) * cellSize
        );
        this.color = currentColor = `hsl(${(Math.random() * 360)},100%,50%)`;
        this.size = cellSize;
        this.cells = cells
    }
    draw() {
        let { x, y } = this.pos;
        ctx.globalCompositeOperation = "lighter";
        // ctx.shadowBlur = 20;
        // ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.size, this.size);
        ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 0;
    }
    spawn(history) {
        let randX = Math.trunc((Math.random() * this.cells)) * this.size;
        let randY = Math.trunc((Math.random() * this.cells)) * this.size;
        if (history) {
            for (let path of history) {
                if (isCollision(new Vec(randX, randY), path)) {
                    return this.spawn();
                }
            }
        }
        this.color = currentColor = `hsl(${randColor()}, 100%, 50%)`;
        this.pos = new Vec(randX, randY);
    }
}

const randColor = () => {
    return (Math.random() * 360);
}

export default Food