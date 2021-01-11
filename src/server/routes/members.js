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

    app.get('/members/:username', async (req, res) => {
        const member = await User.findOne({"local.username": req.params.username})
        if(member == null){
            res.redirect('/')
        }else{
            res.render('user/profile', { member: member, user: req.user})
        }
    })

    const fs = require('fs')
    const multer = require('multer')
    
    var upload = multer({ storage: multer.memoryStorage() })

    app.post('/members/update_avatar', upload.single('newAvatar'), async (req, res, next) => {
        if(req.isAuthenticated()){
            const file = req.file
            if(file){
                req.user.avatar = 'data:image/png;base64,' + file.buffer.toString('base64');
                await req.user.save()
                return res.redirect('/profile')
            }
        }
        res.redirect('/')
    })
}