const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');

router
    .route('/')
    .post(articleController.addArticle)
    .get(articleController.showArticles)

router
    .route('/:articleId')
    .put(articleController.updateArticle)
    .delete(articleController.deleteArticle)

module.exports = router;