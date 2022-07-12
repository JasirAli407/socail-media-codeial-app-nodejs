const passport = require('passport');
// 'L' capital --> naming convention
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    // here 'email' schemayile aan uddheshchath
    usernameField: 'email',
    passReqToCallback: true
},        
        //  they are inbuilt arguments in passport
        // passReqToCallback: true, so req ivde arg aay pass aaka
function(req, email, password, done){

    // find a user and establish the identity
    User.findOne({email: email}, function(err, user){
        if(err){
            req.flash('error', err);
            // done() takes two args ;first is error. but 2nd is not needed here
            return done(err); // js can run on by giving one argument also
        }
        
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
            // here error is null and authentication has not been done
            return done(null,false);
        }
        // here it will return the user to serailize user ..adeelollath
         return done(null, user);
    });
}
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding user --> Passport");
            return done(err);
        }
        return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we r just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();

}


module.exports = passport;