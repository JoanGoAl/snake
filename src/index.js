import Snake from './snake.js';
import Food from './food.js';
import Login from './login.js';
import { KEY, drawGrid } from './helpers.js'
import { ctx, display_score, restart, startButt, cellSize, cells, W, H } from '../utils/constants.js'

let snake, food, speed
let login
ctx.lineWidth = 1;
ctx.strokeStyle = "#23233275";
ctx.shadowBlur = 0;


const start = () => {
    let dificultad = document.querySelector('input[name="diff"]:checked').value;

    if (!snake) {
        clearTimeout(speed);
        KEY.listen();
        snake = new Snake(dificultad);
        food = new Food(cells, cellSize);
        restart.addEventListener("click", reset, false);
        loop();
    }
}

const reset = () => {
    let dificultad = document.querySelector('input[name="diff"]:checked').value;

    display_score.innerText = "00";
    snake = new Snake(dificultad);
    food.spawn(snake.history);
    KEY.resetState();
    snake.isGameOver = false;
    clearTimeout(speed);
    loop();
}

const loop = () => {
    clear();
    if (!snake.isGameOver) {
        speed = snake.speed(loop);
        drawGrid();
        food.draw();
        snake.update(food);
    } else {
        clear();
        snake.gameOver();
    }
}

const clear = () => {
    ctx.clearRect(0, 0, W, H);
}

startButt.addEventListener('click', () => {
    start()
})

// login = new Login()
// login.drawLogin()