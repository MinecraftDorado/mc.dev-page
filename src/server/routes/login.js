module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index', {
            user: req.user
        })
    })

    app.get('/login', (req, res) => {
        if(req.isAuthenticated()){
            res.redirect('/profile')
        }else{
            res.render('user/login', {
                message: req.flash('loginMessage'),
                user: req.user
            })
        }
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/signup', (req, res) => {
        if(req.isAuthenticated()){
            res.redirect('/profile')
        }else{
            res.render('user/register', {
                message: req.flash('signupMessage'),
                user: req.user
            })
        }
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('user/profile', {
            user: req.user
        })
    })

    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/login')
    }
}

