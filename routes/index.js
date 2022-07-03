const express = require('express');

// creating a route handler
const router =  express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;