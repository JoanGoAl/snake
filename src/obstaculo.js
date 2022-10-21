import { Vector, isCollision } from './helpers.js'
import { ctx } from '../utils/constants.js'

class Obstaculo {
    constructor(cells, cellSize) {
        this.pos = new Vector(
            Math.trunc(Math.random() * cells) * cellSize,
            Math.trunc(Math.random() * cells) * cellSize
        );
        this.history = [];
        this.size = cellSize;
        this.cells = cells;
        this.cant = 0
    }
    draw() {
        for (let i = 0; i < this.history.length; i++) {
            let { x, y } = this.history[i];
            ctx.lineWidth = 1;
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, this.size, this.size);
        }
    }
    spawn(snakeHistory) {
        let randX = Math.trunc((Math.random() * this.cells)) * this.size;
        let randY = Math.trunc((Math.random() * this.cells)) * this.size;

        let auxHistory = this.history
            ? [...snakeHistory, ...this.history]
            : snakeHistory

        if (auxHistory) {
            for (let path of auxHistory) {
                if (isCollision(new Vector(randX, randY), path)) {
                    return this.spawn();
                }
            }
        }
        this.pos = new Vector(randX, randY);
        this.history.push(this.pos)
        this.cant++
    }
}

export default Obstaculo