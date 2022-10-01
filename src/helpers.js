class Vec {
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
        if (v instanceof Vec) {
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

export { Vec, KEY, isCollision }