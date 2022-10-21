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
        snake = new Snake(dificultad);
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
    snake = new Snake(dificultad);
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

const getScore = async () => {

    let scores = document.querySelectorAll('.score-top')
    scores.forEach(item => {
        item.remove()
    })

    let info = await fetch(`http://localhost:3000/rank/getScore`)
        .then(response => response.json())
        .then(data => data);

    let sortedInfo = info.sort((a, b) => b.score - a.score).slice(0, 5)

    let containerScore = document.querySelector('.top-score')

    sortedInfo.forEach(item => {

        let aux = document.createElement('div')
        aux.className = "score-top"
        aux.innerText = `${item.name}: ${item.score}`

        containerScore.appendChild(aux)
    });
    // document.createElement
}
getScore()

login = new Login()
// login.drawLogin()