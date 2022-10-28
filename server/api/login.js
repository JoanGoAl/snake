const fs = require('fs')

exports.login = async (req, res) => {

    fs.readFile("./bbdd/users.json", "utf8", (err, jsonString) => {
        if (err) console.log(err);
        const users = JSON.parse(jsonString);

        let selectUser = users.filter(u => u.name === req.params.name)

        res.json(selectUser[0])
    })

}

exports.register = async (req, res) => {

    fs.readFile("./bbdd/users.json", "utf8", (err, jsonString) => {
        if (err) console.log(err);
        const users = JSON.parse(jsonString);
        let selectUser = users.filter(u => u.name === req.body.name)

        if (selectUser.length === 0) {
            users.push({
                name: req.body.name,
                passwd: req.body.passwd,
                score: 0
            })
            fs.writeFile("./bbdd/users.json", JSON.stringify(users), (err) => {
                if (err) console.log(err);
                res.json({ message: "User created" })
            })
        } else {
            res.json({ message: "User already exists" })
        }
    })

}