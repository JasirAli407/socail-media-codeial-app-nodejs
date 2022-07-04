const User = require("../models/user");

module.exports.profile = function(req,res){
     // return res.end('<h1>User Profile</h1>');
       User.findById(req.params.id,function(err, user){
          return res.render('user_profile',{
               title: 'Profile',
                profile_user: user
          });
       })
    
}

module.exports.update = function(req, res){
     if(req.params.id == req.user.id){
     // User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email}, callback function)  OR
     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
          return res.redirect('back')
     })
}else{
     return res.status(401).send('Unauthorized')
}
}

module.exports.signUp = function(req,res){
     if(req.isAuthenticated()){
         return res.redirect('/users/profile');
     }
     return res.render('user_sign_up', {
          title: "codeial | Sign Up"
     });
}



module.exports.signIn = function(req, res){
     if(req.isAuthenticated()){
         return res.redirect('/users/profile');
     }
     return res.render('user_sign_in', {
          title: "codeial | Sign In"
     });
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
     return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err, user){
     if(err){
          console.log('Error in finding user in signing up');
          return;
     }

     if(!user){
          User.create(req.body, function(err, user){
         if(err){
          console.log('Error in creating user while signing up');
         }
         return res.redirect('/users/sign-in');
          })
     }else{
          return res.redirect('back');
     }
    });
    


}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
     // this logout() is given by passport
     req.logout(function(err){
          if(err){ console.log(err);}
          return(res.redirect('/'));
     });  
    
}

