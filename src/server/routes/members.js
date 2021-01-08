module.exports = (app) => {

    const {User, roles} = require('../models/user')

    app.get('/members', async (req, res) => {
        const users = await User.find().sort({ createdAt: 'desc' })
        res.render('user/members', { users: users, user: req.user, roles: roles})
    })


    app.post('/members/rank/:id', async (req, res) => {
        if(req.isAuthenticated() && req.user.role == 'ADMIN'){
            let user = await User.findById(req.params.id)
            user.role = req.body.rol
            user = await user.save()
        }
        res.redirect('/members')
    })

    app.delete('/members/:id', async (req, res) => {
        if(req.isAuthenticated() && req.user.role == 'ADMIN'){
            await User.findByIdAndDelete(req.params.id)
        }
        res.redirect('/members')
    })
}