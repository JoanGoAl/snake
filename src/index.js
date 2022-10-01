import Snake from './snake.js';
import Food from './food.js';
import { KEY } from './helpers.js'

document.addEventListener('DOMContentLoaded', (e) => {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d")
    let display_score = document.getElementById('score_val')
    let restart = document.querySelector('.btn-restart');
    let start = document.querySelector('.btn-start')

    let snake, cellSize, cellsCount, food, requestID
    let cells = 20
    const W = canvas.width = 400;
    const H = canvas.height = 400;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#23233275";
    ctx.shadowBlur = 0;

    function initialize() {
        ctx.imageSmoothingEnabled = false;
        KEY.listen();
        cellsCount = cells * cells;
        cellSize = W / cells;
        snake = new Snake();
        food = new Food(cells, cellSize);
        restart.addEventListener("click", reset, false);
        loop();
    }

    function reset() {
        display_score.innerText = "00";
        snake = new Snake();
        food.spawn(snake.history);
        KEY.resetState();
        snake.isGameOver = false;
        clearTimeout(requestID);
        loop();
    }

    function loop() {
        clear();
        if (!snake.isGameOver) {
            requestID = setTimeout(loop, 1500 / 60);
            drawGrid();
            food.draw();
            snake.update(food);
        } else {
            clear();
            snake.gameOver();
        }
    }

    function clear() {
        ctx.clearRect(0, 0, W, H);
    }

    start.addEventListener('click', () => {
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
})
