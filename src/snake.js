import { Vec, KEY, isCollision } from "./helpers.js"

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")
let display_score = document.getElementById('score_val')


let snake, cellsCount, currentColor, isGameOver, food, requestID
let score = "00"
let cells = 20
const W = canvas.width = 400;
const H = canvas.height = 400;
let cellSize = W / cells;

class Snake {
    constructor(i, type) {
        this.pos = new Vec(W / 2, H / 2);
        this.dir = new Vec(0, 0);
        this.type = type;
        this.index = i;
        this.delay = 5;
        this.size = W / cells;
        this.color = "white";
        this.history = [];
        this.total = 1;
    }
    draw() {
        let { x, y } = this.pos;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(255,255,255,.3 )";
        ctx.fillRect(x, y, this.size, this.size);
        ctx.shadowBlur = 0;
        if (this.total >= 2) {
            for (let i = 0; i < this.history.length - 1; i++) {
                let { x, y } = this.history[i];
                ctx.lineWidth = 1;
                ctx.fillStyle = "rgba(225,225,225,1)";
                ctx.fillRect(x, y, this.size, this.size);
            }
        }
    }
    walls() {
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
    controlls() {
        let dir = this.size;
        if (KEY.ArrowUp) {
            this.dir = new Vec(0, -dir);
        }
        if (KEY.ArrowDown) {
            this.dir = new Vec(0, dir);
        }
        if (KEY.ArrowLeft) {
            this.dir = new Vec(-dir, 0);
        }
        if (KEY.ArrowRight) {
            this.dir = new Vec(dir, 0);
        }
    }
    selfCollision() {
        for (let i = 0; i < this.history.length; i++) {
            let p = this.history[i];
            if (isCollision(this.pos, p)) {
                isGameOver = true;
            }
        }
    }
    update(food) {
        this.walls();
        this.draw();
        this.controlls();
        if (!this.delay--) {
            if (isCollision(this.pos, food.pos)) {
                incrementScore();
                food.spawn(this.history);
                this.total++;
            }
            this.history[this.total - 1] = new Vec(this.pos.x, this.pos.y);
            for (let i = 0; i < this.total - 1; i++) {
                this.history[i] = this.history[i + 1];
            }
            this.pos.add(this.dir);
            this.delay = 5;
            this.total > 3 ? this.selfCollision() : null;
        }
    }
}

function incrementScore() {
    score++;
    display_score.innerText = score.toString().padStart(2, "0");
}

export default Snake