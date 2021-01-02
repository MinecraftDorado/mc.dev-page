const express = require('express')
const router = express.Router()

const Article = require('./../models/article')

router.get('/update/new', (req, res) => {
    res.render('updates/new', { article: new Article() })
})

router.get('/update/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('updates/edit', { article: article })
})

router.get('/update/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    else res.render('updates/content', {article: article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/update/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/update/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/update/${article.slug}`)
        } catch (e) {
            res.render(`update/${path}`, { article: article })
        }
    }
}

module.exports = router