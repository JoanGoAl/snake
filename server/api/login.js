const fs = require('fs')

exports.login = async (req, res) => {

    fs.readFile("./bbdd/users.json", "utf8", (err, jsonString) => {
        if (err) console.log(err);
        const users = JSON.parse(jsonString);

        let selectUser = users.filter(u => u.name === req.params.name)

        res.json(selectUser[0])
    })

}