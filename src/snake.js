import { Vector, KEY, isCollision } from "./helpers.js"
import { ctx, display_score, cellSize, cells, W, H } from '../utils/constants.js'

class Snake {
    constructor(dificultad) {
        this.pos = new Vector(W / 2, H / 2);
        this.dir = new Vector(0, 0);
        this.delay = 5;
        this.size = W / cells;
        this.color = "white";
        this.history = [];
        this.longitud = 1;
        this.isGameOver = false;
        this.score = 0;
        this.teleport = false;
        this.dificultad = dificultad
    }
    draw() {
        let { x, y } = this.pos;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(255,255,255,.3 )";
        ctx.fillRect(x, y, this.size, this.size);
        ctx.shadowBlur = 0;
        if (this.longitud >= 2) {
            for (let i = 0; i < this.history.length - 1; i++) {
                let { x, y } = this.history[i];
                ctx.lineWidth = 1;
                ctx.fillStyle = "rgba(225,225,225,1)";
                ctx.fillRect(x, y, this.size, this.size);
            }
        }
    }
    wallsTeleport() {
        let { x, y } = this.pos;
        if (x + cellSize > W) {
            this.pos.x = 0;
        }
        if (y + cellSize > W) {
            this.pos.y = 0;
        }
        if (y < 0) {
            this.pos.y = H - cellSize;
        }
        if (x < 0) {
            this.pos.x = W - cellSize;
        }
    }
    wallsColition() {
        let { x, y } = this.pos;
        if (x + cellSize > W) {
            this.isGameOver = true;
        }
        if (y + cellSize > W) {
            this.isGameOver = true;
        }
        if (y < 0) {
            this.isGameOver = true;
        }
        if (x < 0) {
            this.isGameOver = true;
        }
    }
    controlls() {
        let dir = this.size;
        if (KEY.ArrowUp) {
            this.dir = new Vector(0, -dir);
        }
        if (KEY.ArrowDown) {
            this.dir = new Vector(0, dir);
        }
        if (KEY.ArrowLeft) {
            this.dir = new Vector(-dir, 0);
        }
        if (KEY.ArrowRight) {
            this.dir = new Vector(dir, 0);
        }
    }
    selfCollision() {
        for (let i = 0; i < this.history.length; i++) {
            let p = this.history[i];
            if (isCollision(this.pos, p)) {
                this.isGameOver = true;
            }
        }
    }
    update(food) {
        this.teleport ? this.wallsTeleport() : this.wallsColition()
        this.draw();
        this.controlls();
        if (!this.delay--) {
            if (isCollision(this.pos, food.pos)) {
                this.incrementScore();
                food.spawn(this.history);
                this.longitud++;
            }
            this.history[this.longitud - 1] = new Vector(this.pos.x, this.pos.y);
            for (let i = 0; i < this.longitud - 1; i++) {
                this.history[i] = this.history[i + 1];
            }
            this.pos.add(this.dir);
            this.delay = 5;
            this.longitud > 3 ? this.selfCollision() : null;
        }
    }
    incrementScore() {
        this.score++;
        display_score.innerText = this.score.toString().padStart(2, "0");
    }
    speed(loop) {
        let snakeSpeed = 35 - (this.score / 2)
        return setTimeout(loop, snakeSpeed);
    }
    gameOver() {
        ctx.fillStyle = "#1FAAC9";
        ctx.textAlign = "center";
        ctx.font = "bold 30px Poppins, sans-serif";
        ctx.fillText("GAME OVER", W / 2, H / 2);
        ctx.font = "15px Poppins, sans-serif";
        ctx.fillText(`SCORE   ${this.score}`, W / 2, H / 2 + 60);
        console.log(this.dificultad);


    }
}

export default Snake 