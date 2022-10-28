const fs = require('fs')

exports.setRank = async (req, res) => {

    const info = {
        name: req.body.name,
        score: req.body.score
    }
    const path = './bbdd/rank.json';

    try {
        let inforank = JSON.parse(fs.readFileSync(path))

        inforank.map(item => {
            if (item.name == info.name && item.score < info.score) {
                return info
            }
            return item
        })
        // inforank.push(info)
        newInfo = inforank.map(item => {
            if (item.name == info.name && item.score < info.score) {
                return info
            }
            return item
        })

        let names = newInfo.map(item => item.name)

        if (!names.includes(info.name)) newInfo.push(info)

        fs.writeFileSync(path, JSON.stringify(newInfo), 'utf8');
        res.send(newInfo)
    } catch (error) {
        res.send({ info: 'An error has occurred ', error })
    }
}

exports.setUserScore = async (req, res) => {
    try {
        let users = JSON.parse(fs.readFileSync('./bbdd/users.json'))

        users.map(item => {
            if (item.name == req.body.name && item.score < req.body.score) {
                item.score = req.body.score
            }
            return item
        })

        fs.writeFileSync('./bbdd/users.json', JSON.stringify(users), 'utf8');
    } catch (error) {
        res.send(error)
    }
}

exports.getScore = async (req, res) => {
    const path = './bbdd/rank.json';

    try {
        let inforank = JSON.parse(fs.readFileSync(path))
        res.send(inforank)
    } catch (error) {
        res.send({ info: 'An error has occurred ', error })
    }
}