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
    login() {

        this.userName = inputName.value
        this.passwd = inputPasswd.value

        let user = {
            login: this.userName,
            passwd: this.passwd
        }

        if (user.login) {
            fetch(`http://localhost:3000/login/${user.login}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });
        }


        // user.passwd !== 'joang' ? labelError.innerText = 'Contraseña incorrecta' : labelError.innerText = ''

        if (this.loginStatus) {
            this.clearLogin()
        }
    }
    clearLogin() {
        contiainerAll.remove()
    }
}

export default Login