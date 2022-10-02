import { Vector, isCollision } from './helpers.js'
import { ctx } from '../utils/constants.js'

class Food {
    constructor(cells, cellSize) {
        this.pos = new Vector(
            Math.trunc(Math.random() * cells) * cellSize,
            Math.trunc(Math.random() * cells) * cellSize
        );
        this.color = this.randColor();
        this.size = cellSize;
        this.cells = cells
    }
    draw() {
        let { x, y } = this.pos;
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
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
                if (isCollision(new Vector(randX, randY), path)) {
                    return this.spawn();
                }
            }
        }
        this.color = this.randColor();
        this.pos = new Vector(randX, randY);
    }
    randColor() {
        return `hsl(${(Math.random() * 360)},100%,50%)`;
    }
}

export default Food