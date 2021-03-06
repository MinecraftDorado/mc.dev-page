module.exports = (app) => {

    const Update = require('./../models/update')

    app.get('/update/new', (req, res) => {
        if(req.isAuthenticated() && req.user.role == 'ADMIN'){
            res.render('updates/new', { update: new Update() })
        }else{
            res.redirect('/')
        }
    })

    app.get('/update/edit/:id', async (req, res) => {
        const update = await Update.findById(req.params.id)

        if(req.isAuthenticated() && req.user.role == 'ADMIN'){
            res.render('updates/edit', { update: update })
        }else{
            res.redirect('/update/' + update.slug)
        }
    })

    app.get('/update/:slug', async (req, res) => {
        const update = await Update.findOne({ slug: req.params.slug })
        if (update == null) res.redirect('/')
        else res.render('updates/content', {update: update, user: req.user })
    })

    app.post('/update', async (req, res, next) => {
        req.update = new Update()
        next()
    }, saveUpdateAndRedirect('new'))

    app.put('/update/:id', async (req, res, next) => {
        req.update = await Update.findById(req.params.id)
        next()
    }, saveUpdateAndRedirect('edit'))
    
    app.delete('/update/:id', async (req, res) => {
        if(req.isAuthenticated() && req.user.role == 'ADMIN'){
            await Update.findByIdAndDelete(req.params.id)
        }
        res.redirect('/')
    })

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