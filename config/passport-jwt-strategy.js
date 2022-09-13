const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    // we'll be finding jwt from the header
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    // every encr goes through this and every decryp happens bcos of this key
    secretOrKey : 'codeial'
}

//   done is a cb()
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, user){
        if(err){return console.log('Error in finding user from JWt'); }

        if(user){
            // req.user is set here i think so
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));


module.exports = passport;