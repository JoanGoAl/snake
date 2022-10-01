document.addEventListener('DOMContentLoaded', (e) => {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d")

    let snake,
        cellSize,
        cellsCount,
        currentHue

    let cells = 20
    const W = canvas.width = 400;
    const H = canvas.height = 400;
    // let X = 180
    // let Y = 180

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#23233275";
    ctx.shadowBlur = 0;

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
        // selfCollision() {
        //     for (let i = 0; i < this.history.length; i++) {
        //         let p = this.history[i];
        //         if (helpers.isCollision(this.pos, p)) {
        //             isGameOver = true;
        //         }
        //     }
        // }
        update() {
            this.walls();
            this.draw();
            this.controlls();
            if (!this.delay--) {
                // if (helpers.isCollision(this.pos, food.pos)) {
                //     incrementScore();
                //     particleSplash();
                //     food.spawn();
                //     this.total++;
                // }
                this.history[this.total - 1] = new Vec(this.pos.x, this.pos.y);
                for (let i = 0; i < this.total - 1; i++) {
                    this.history[i] = this.history[i + 1];
                }
                this.pos.add(this.dir);
                this.delay = 5;
                // this.total > 3 ? this.selfCollision() : null;
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
            addEventListener(
                "keydown",
                (e) => {
                    if (e.key === "ArrowUp" && this.ArrowDown) return;
                    if (e.key === "ArrowDown" && this.ArrowUp) return;
                    if (e.key === "ArrowLeft" && this.ArrowRight) return;
                    if (e.key === "ArrowRight" && this.ArrowLeft) return;
                    this[e.key] = true;
                    Object.keys(this)
                        .filter((f) => f !== e.key && f !== "listen" && f !== "resetState")
                        .forEach((k) => {
                            this[k] = false;
                        });
                },
                false
            );
        }
    };

    class Food {
        constructor() {
            this.pos = new Vec(
                Math.trunc(Math.random() * cells) * cellSize,
                Math.trunc(Math.random() * cells) * cellSize
            );
            this.color = currentHue = `hsl(${~~(Math.random() * 360)},100%,50%)`;
            this.size = cellSize;
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
    }

    function initialize() {
        ctx.imageSmoothingEnabled = false;
        KEY.listen();
        cellsCount = cells * cells;
        cellSize = W / cells;
        snake = new Snake();
        food = new Food();
        // dom_replay.addEventListener("click", reset, false);
        loop();
    }

    function loop() {
        clear();
        // if (!isGameOver) {
        requestID = setTimeout(loop, 1500 / 60);
        drawGrid();
        snake.update();
        food.draw();
        // for (let p of particles) {
        //     p.update();
        // }
        // helpers.garbageCollector();
        // } else {
        //     // clear();
        //     // gameOver();
        // }
    }

    function clear() {
        ctx.clearRect(0, 0, W, H);
    }

    let start = document.querySelector('.btn-start')
    start.addEventListener('click', (e) => {
        initialize()
    })

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


    // const drawGrid = () => {

    //     for (let i = 1; i < cells; i++) {
    //         let f = (W / cells) * i;
    //         ctx.beginPath();
    //         ctx.moveTo(f, 0);
    //         ctx.lineTo(f, H);
    //         ctx.stroke();
    //         ctx.beginPath();
    //         ctx.moveTo(0, f);
    //         ctx.lineTo(W, f);
    //         ctx.stroke();
    //         ctx.closePath();
    //     }

    // }

    // let interval;
    // let direction = 0 // 0 -> Bajo, 1 -> Derecha, 2 -> Izquierda, 3 -> Arriba

    // const snakeMove = (key) => {

    //     clearInterval(interval)
    //     interval = setInterval(() => {

    //         ctx.clearRect(X, Y, 20, 20);

    //         if (X == 380) X = -20
    //         if (X == 0) X = 400
    //         if (Y == 380) Y = -20



    //         if (key == 'ArrowDown') {
    //             if (direction == 3) snakeMove('ArrowUp')
    //             Y += 20;
    //             direction = 0
    //         }
    //         if (key == 'ArrowRight') X += 20
    //         if (key == 'ArrowLeft') X -= 20
    //         if (key == 'ArrowUp') {
    //             if (direction == 0) snakeMove('ArrowDown')
    //             Y -= 20
    //             direction = 3
    //         }


    //         ctx.clearRect(0, 0, 400, 400)
    //         ctx.fillRect(X, Y, 20, 20)
    //         drawGrid()
    //     }, 300)
    // }

    // const keypress = (e) => {
    //     switch (true) {
    //         case e.key == 'ArrowDown':
    //             snakeMove(e.key)
    //             break;
    //         case e.key == 'ArrowRight':
    //             snakeMove(e.key)
    //             break;
    //         case e.key == 'ArrowUp':
    //             snakeMove(e.key)
    //             break;
    //         case e.key == 'ArrowLeft':
    //             snakeMove(e.key)
    //             break;
    //     }
    // }


    // let start = document.querySelector('.btn-start')

    // start.addEventListener('click', (e) => {
    //     ctx.clearRect(0, 0, 400, 400)
    //     drawGrid()

    //     ctx.fillStyle = 'green'
    //     ctx.fillRect(180, 180, 20, 20)
    // })

    // document.addEventListener('keydown', (e) => {
    //     ctx.clearRect(0, 0, 400, 400)
    //     ctx.clearRect(X, Y, 20, 20);

    //     keypress(e)




    //     drawGrid()
    // })
})
