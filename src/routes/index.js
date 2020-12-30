const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index.html', {title: "Index"})
})

router.get('/update', (req, res) => {
    res.render('updates/content.html', {title: "Update"})
})

module.exports = router