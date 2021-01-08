const LocalStrategy = require('passport-local').Strategy

const {User} = require('../models/user')

module.exports = function (passport) {
    
    const {admin} = require('./secret')

    passport.serializeUser(function (user, done) {
        console.log('Serialize user called.');
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done){
        console.log('Deserialize user called.');
        User.findById(id, function (err, user) {
            done(err, user)
        })
    })

    // signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    
    function (req, username, password, done) {
        User.findOne({'local.username': username}, function (err, user) {
            if(err) {return done(err)}
            if(user) {
                return done(null, false, req.flash('signupMessage', 'This username already exist'))
            } else {
                var newUser = new User()
                newUser.local.username = username
                newUser.local.password = newUser.generateHash(password)
                newUser.save(function (err) {
                    if(err) {throw err}
                    return done(null, newUser)
                })
            }
        })
    }

    ))

    // login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    
    function (req, username, password, done) {

        process.nextTick(function () {
            
                    /*if(username == admin.username && password == admin.password){
                        var user = new User()
                        user.local.username = username
                        user.local.password = user.generateHash(password)
                        user.role = 'ADMIN'
            
                        return done(null, user, req.flash('loginMessage', 'IDK'))
                    }*/

            User.findOne({ 'local.username': username }, function (err, user) {
                if (err) { return done(err) }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'This username not exist'))
                }
                if (!user.validatePassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong password'))
                }
                // needs to be modified
                if (username == admin.username && user.validatePassword(admin.password) && user.role != 'ADMIN') {
                    user.role = 'ADMIN'
                    user.save(function (err) {
                        if (err) { throw err }
                    })
                }
                return done(null, user)
            })
        })
    }
    ))
}