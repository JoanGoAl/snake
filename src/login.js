let loginContainer = document.getElementById('login')

let contiainerAll = document.createElement('div')
contiainerAll.className = 'containerAllLogin'
class Login {
    constructor() {
        this.userName = ""
        this.passwd = ""
        this.maxScore = ""
    }
    drawLogin() {
        let background = document.createElement('div')
        background.className = 'background'
        let shape1 = document.createElement('div')
        shape1.className = 'shape'
        let shape2 = document.createElement('div')
        shape2.className = 'shape'

        background.appendChild(shape1)
        background.appendChild(shape2)

        let form = document.createElement('form')
        let title = document.createElement('h3')
        let labelName = document.createElement('label')
        labelName.setAttribute('for', 'username')
        let inputName = document.createElement('input')
        inputName.type = 'text'
        inputName.placeholder = 'Email'
        inputName.id = 'username'

        let labelPasswd = document.createElement('label')
        labelPasswd.setAttribute('for', 'passwd')
        let inputPasswd = document.createElement('input')
        inputPasswd.type = 'password'
        inputPasswd.placeholder = 'Password'
        inputPasswd.id = 'passwd'
        let button = document.createElement('button')

        title.innerText = 'Login Snake'
        labelName.innerText = 'Usuario'
        labelPasswd.innerText = 'Contraseña'
        button.innerText = 'Log In'
        form.appendChild(title)
        form.appendChild(labelName)
        form.appendChild(inputName)
        form.appendChild(labelPasswd)
        form.appendChild(inputPasswd)
        form.appendChild(button)

        loginContainer.appendChild(contiainerAll)
        contiainerAll.appendChild(background)
        contiainerAll.appendChild(form)

        button.addEventListener('click', (e) => {
            e.preventDefault()
            this.clearLogin()
        })
    }
    login() {

    }
    clearLogin() {
        contiainerAll.remove()
    }
}

export default Login