module.exports = (app) => {

    app.get('/wiki/chester', (req, res) => {
        res.render('wiki/chester', {user: req.user})
    })

    app.get('/wiki/blackmarket', (req, res) => {
        res.render('wiki/blackmarket', {user: req.user})
    })
}