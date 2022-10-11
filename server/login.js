


exports.login = (req, res) => {
    let info = {
        hola: `Hello ${req.params.name}!`
    }
    res.json(info)
}