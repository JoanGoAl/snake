const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Login = require('./api/login')
const Rank = require('./api/rank')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/login/:name', Login.login)
app.post('/login/register', Login.register)
app.post('/rank/setScore', Rank.setRank)
app.get('/rank/getScore', Rank.getScore)
app.post('/rank/setUserScore', Rank.setUserScore)

app.get('/', (req, res) => {
    let info = {
        hola: 'Hello World!'
    }
    res.send(info)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port} 🚀`)
})