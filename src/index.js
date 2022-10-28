import Snake from './snake.js';
import Food from './food.js';
import Login from './login.js';
import { KEY, drawGrid } from './helpers.js'
import { ctx, display_score, restart, startButt, cellSize, cells, W, H } from '../utils/constants.js'
import Obstaculo from './obstaculo.js';

let snake, food, speed, obstacle
let login
ctx.lineWidth = 1;
ctx.strokeStyle = "#23233275";
ctx.shadowBlur = 0;


const start = () => {
    let dificultad = document.querySelector('input[name="diff"]:checked').value;
    if (!snake) {
        clearTimeout(speed);
        KEY.listen();
        snake = new Snake();
        switch (dificultad) {
            case 'classic':
                snake.obstaculosMode = false
                snake.teleport = false
                break;
            case 'advanced':
                snake.obstaculosMode = true
                snake.teleport = false
                break;
            case 'pro':
                snake.obstaculosMode = true
                snake.teleport = true
                break;
            default:
                break;
        }
        console.log(dificultad);
        food = new Food(cells, cellSize);
        obstacle = new Obstaculo(cells, cellSize);
        restart.addEventListener("click", reset, false);
        loop();
    }
}

const reset = () => {
    let dificultad = document.querySelector('input[name="diff"]:checked').value;
    getScore()
    display_score.innerText = "00";
    snake = new Snake();
    switch (dificultad) {
        case 'classic':
            snake.obstaculosMode = false
            snake.teleport = false
            break;
        case 'advanced':
            snake.obstaculosMode = true
            snake.teleport = false
            break;
        case 'pro':
            snake.obstaculosMode = true
            snake.teleport = true
            break;
        default:
            break;
    }
    obstacle = new Obstaculo(cells, cellSize);
    food.spawn(snake.history, obstacle.history);
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
        snake.update(food, obstacle);
        food.draw();
        obstacle.draw()
    } else {
        clear();
        snake.gameOver(login);
    }
}

const clear = () => {
    ctx.clearRect(0, 0, W, H);
}

startButt.addEventListener('click', () => {
    start()
})


login = new Login()
login.drawLogin()