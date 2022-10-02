import { cells, W, H, ctx } from "../utils/constants.js"

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    mult(v) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
            return this;
        } else {
            this.x *= v;
            this.y *= v;
            return this;
        }
    }
}

let KEY = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    resetState() {
        this.ArrowUp = false;
        this.ArrowRight = false;
        this.ArrowDown = false;
        this.ArrowLeft = false;
    },
    listen() {
        addEventListener("keydown", (key) => {
            if (key.key === "ArrowUp" && this.ArrowDown) return;
            if (key.key === "ArrowDown" && this.ArrowUp) return;
            if (key.key === "ArrowLeft" && this.ArrowRight) return;
            if (key.key === "ArrowRight" && this.ArrowLeft) return;
            this[key.key] = true;
            Object.keys(this)
                .filter((f) => f !== key.key && f !== "listen" && f !== "resetState")
                .forEach((k) => {
                    this[k] = false;
                });
        },
            false
        );
    }
};

const isCollision = (v1, v2) => {
    return v1.x == v2.x && v1.y == v2.y;
}

const drawGrid = () => {
    for (let i = 1; i < cells; i++) {
        let f = (W / cells) * i;
        ctx.beginPath();
        ctx.moveTo(f, 0);
        ctx.lineTo(f, H);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, f);
        ctx.lineTo(W, f);
        ctx.stroke();
        ctx.closePath();
    }
}

export { Vector, KEY, isCollision, drawGrid }