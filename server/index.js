const cors = require('cors');
const express = require('express')
const app = express()
const port = 3000

const Login = require('./api/login')
const Rank = require('./api/rank')

app.use(cors());


app.get('/login/:name', Login.login)
app.post('/rank/setScore/:name/:score', Rank.setRank)
app.get('/rank/getScore', Rank.getScore)

app.get('/', (req, res) => {
    let info = {
        hola: 'Hello World!'
    }
    res.send(info)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port} 🚀`)
})