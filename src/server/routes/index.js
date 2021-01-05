module.exports = (app) => {

    const Update = require('./../models/update')

    app.get('/', async (req, res) => {
        const updates = await Update.find().sort({ createdAt: 'desc' })
        res.render('index', { updates: updates, user: req.user})
    })

}