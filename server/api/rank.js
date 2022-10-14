const fs = require('fs')

exports.setRank = async (req, res) => {

    const info = {
        name: req.params.name,
        score: req.params.score
    }
    const path = './bbdd/rank.json';

    try {
        let inforank = JSON.parse(fs.readFileSync(path))

        inforank.push(info)

        fs.writeFileSync(path, JSON.stringify(inforank, null, 2), 'utf8');
        res.send(inforank)
    } catch (error) {
        res.send({ info: 'An error has occurred ', error })
    }
}

exports.getScore = async (req, res) => {
    const path = './bbdd/rank.json';

    try {
        let inforank = JSON.parse(fs.readFileSync(path))
        res.send(inforank.slice(0, 5))
    } catch (error) {
        res.send({ info: 'An error has occurred ', error })
    }
}