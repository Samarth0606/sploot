const express = require('express');
const router =  express();
const {allArticles , addArticle} = require('../controllers/article')
const {authenticatedUser} = require('../middlewares/auth')

// posting an article
router.post('/api/users/:userId/articles' , authenticatedUser , addArticle)

// get all the articles
router.get('/api/articles' , authenticatedUser , allArticles)


module.exports = router;