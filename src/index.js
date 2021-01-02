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

// settings
app.set('port', 3000) // Define una variable que se puede obtener desde otro archivo
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// routes
app.use(require('./routes/index'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('index', { title:'BlackMarket', articles: articles })
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/updates', articleRouter)

// listening the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})

// favicon
app.use('/favicon.ico', express.static('img/favicon.ico'));