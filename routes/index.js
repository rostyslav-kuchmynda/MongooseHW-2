const userRoutes = require('./userRoute');
const articleRoutes = require('./articleRoute');
const express = require('express');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/articles', articleRoutes);

module.exports = router;
