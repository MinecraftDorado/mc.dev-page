const express = require('express')
const app = express()

const path = require('path')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')

const {secret_key} = require('./config/secret')

require('./config/passport')(passport)


//=====================
// SETTINGS
//=====================
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//=====================
// MIDDLEWARES
//=====================
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: secret_key,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))


//=====================
// ROUTES
//=====================

require('./routes/index')(app)
require('./routes/login')(app, passport)
require('./routes/updates')(app)


//=====================
// STATIC FILES
//=====================

app.use(express.static(path.join(__dirname, '.././public')))


//=====================
// SERVER
//=====================

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})