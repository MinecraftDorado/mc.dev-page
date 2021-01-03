const express = require('express')
const app = express()

const path = require('path')

const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/index')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/updates', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

var bodyParser = require("body-parser")

// settings
app.set('port', 3000) // Define una variable que se puede obtener desde otro archivo
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
//app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('_method'))

// routes
app.use(require('./routes/index'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('index', { title:'BlackMarket', articles: articles })
})

app.use(express.static(path.join(__dirname, '../public')))

app.use('/update', articleRouter)

// listening the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})

// favicon
app.use('/favicon.ico', express.static('img/favicon.ico'));




var passport = require("passport"),
    LocalStrategy = require("passport-local"), 
    passportLocalMongoose = require("passport-local-mongoose"), 
    User = require("./models/user"); 
  
app.use(require("express-session")({ 
    secret: "Rusty is a dog", 
    resave: false, 
    saveUninitialized: false
})); 
  
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
  
//===================== 
// ROUTES 
//===================== 

app.use(require('./routes/user/login'))
app.use(require('./routes/user/secret'))
app.use(require('./routes/user/register'))
app.use(require('./routes/user/logout'))