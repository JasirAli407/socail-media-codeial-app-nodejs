const express = require('express');
const router = express.Router();
const passport = require('passport');



const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);


router.get('/sign-up',usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
// here 'local' is the strategy
router.post('/create-session', passport.authenticate('local',{failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// this route is given by passport. scope is the info v r gonna fetch
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// this is the url at which we receive the data
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports = router;