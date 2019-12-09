const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router
    .route('/')
    .post(userController.createUser);

router
    .route('/:userId')
    .get(userController.showUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router
    .route('/:userId/articles')
    .get(userController.showUserArticles);

module.exports = router;