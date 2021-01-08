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

    app.post('/update', async (req, res, next) => {
        req.update = new Update()
        next()
    }, saveUpdateAndRedirect('new'))

    function saveUpdateAndRedirect(path) {
        return async (req, res) => {
            let update = req.update
            update.title = req.body.title
            update.description = req.body.description
            update.markdown = req.body.markdown
            try {
                update = await update.save()
                res.redirect(`/update/${update.slug}`)
            } catch (e) {
                res.render(`update/${path}`, { update: update })
            }
        }
    }
}