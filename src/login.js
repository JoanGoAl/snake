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
        this.avatar = `https://api.multiavatar.com/${this.userName}.png`
    }

    drawLogin() {
        background.className = 'background'
        shape1.className = 'shape'
        shape2.className = 'shape'

        background.appendChild(shape1)
        background.appendChild(shape2)


        labelName.setAttribute('for', 'username')
        inputName.type = 'text'
        inputName.placeholder = 'Username'
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
        this.passwd = inputPasswd.value


        if (this.userName) {
            let info = await fetch(`http://localhost:3000/login/${this.userName}`)
                .then(response => response.json())
                .then(data => data);

            if (this.passwd === info.passwd) {
                this.loginStatus = true
                labelError.innerText = ''

                this.drawProfile()
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
    drawProfile() {

        let img = document.createElement('img')
        img.src = `https://api.multiavatar.com/${this.userName}.png`

        let username = document.createElement('h3')
        username.innerText = this.userName

        let score = document.createElement('h3')
        score.innerText = `Max Score: ${this.maxScore}`

        document.querySelector('.your-top-score').appendChild(score)
        document.querySelector('.container-username').appendChild(username)
        document.querySelector('.container-img').appendChild(img)
    }
    clearLogin() {
        contiainerAll.remove()
    }
}

export default Login