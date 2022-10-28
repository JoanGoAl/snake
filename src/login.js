let loginContainer = document.getElementById('login')

let contiainerAll = document.createElement('div')
contiainerAll.className = 'containerAllLogin'
let background = document.createElement('div')

let shape1 = document.createElement('div')
let shape2 = document.createElement('div')

let form = document.createElement('form')

let title = document.createElement('h3')

let labelName = document.createElement('label')
let inputName = document.createElement('input')

let labelPasswd = document.createElement('label')
let inputPasswd = document.createElement('input')
let labelError = document.createElement('label')

let button = document.createElement('button')

class Login {
    constructor() {
        this.userName = ""
        this.passwd = ""
        this.maxScore = ""
        this.loginStatus = false
        this.avatar = `https://robohash.org/${this.userName}-one`
    }
    drawLogin() {
        background.className = 'background'
        shape1.className = 'shape'
        shape2.className = 'shape'

        background.appendChild(shape1)
        background.appendChild(shape2)


        labelName.setAttribute('for', 'username')
        inputName.type = 'text'
        inputName.placeholder = 'Email'
        inputName.id = 'username'

        labelPasswd.setAttribute('for', 'passwd')
        inputPasswd.type = 'password'
        inputPasswd.placeholder = 'Password'
        inputPasswd.id = 'passwd'
        labelError.style = 'color: red;'

        title.innerText = 'Login Snake'
        labelName.innerText = 'Usuario'
        labelPasswd.innerText = 'Contraseña'
        button.innerText = 'Log In'
        form.appendChild(title)
        form.appendChild(labelName)
        form.appendChild(inputName)
        form.appendChild(labelPasswd)
        form.appendChild(inputPasswd)
        form.appendChild(labelError)
        form.appendChild(button)

        loginContainer.appendChild(contiainerAll)
        contiainerAll.appendChild(background)
        contiainerAll.appendChild(form)

        button.addEventListener('click', (e) => {
            e.preventDefault()
            this.login()
        })
    }
    async login() {

        this.userName = inputName.value

        if (this.userName) {
            let info = await fetch(`http://localhost:3000/login/${this.userName}`)
                .then(response => response.json())
                .then(data => data);
            console.log(info);

            if (inputPasswd.value === info.passwd) {
                this.loginStatus = true
                this.userName = info.name
                this.maxScore = info.maxScore
                labelError.innerText = ''
            } else {
                labelError.innerText = 'Usuario o contraseña incorrecta'
            }
        } else {
            labelError.innerText = 'Usuario o contraseña incorrecta'
        }

        if (this.loginStatus) {
            this.clearLogin()
        }
    }
    clearLogin() {
        contiainerAll.remove()
        this.getScore()
        let container_personal = document.querySelector('.container-personal-score')
        container_personal.innerText = `${this.userName}: ${this.maxScore}`
    }
    getScore = async () => {

        let scores = document.querySelectorAll('.score-top')
        scores.forEach(item => {
            item.remove()
        })

        let info = await fetch(`http://localhost:3000/rank/getScore`)
            .then(response => response.json())
            .then(data => data);

        let sortedInfo = info.sort((a, b) => b.score - a.score).slice(0, 5)

        let containerScore = document.querySelector('.container-top-score')

        sortedInfo.forEach(item => {

            let aux = document.createElement('div')
            aux.className = "score-top"
            aux.innerText = `${item.name}: ${item.score}`

            containerScore.appendChild(aux)
        })

        // document.createElement
    }
    userInfo() {

    }
}

export default Login