const User = require("../models/user");
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
     // return res.end('<h1>User Profile</h1>');
       User.findById(req.params.id,function(err, user){
          return res.render('user_profile',{
               title: 'Profile',
                profile_user: user
          });
       })
    
}

module.exports.update = async function(req, res){
//      if(req.params.id == req.user.id){
//      // User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email}, callback function)  OR
//      User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//           return res.redirect('back')
//      })
// }else{
//      return res.status(401).send('Unauthorized')
// }
if(req.params.id == req.user.id){
     // console.log(req.params)
   try{
     let user = await User.findById(req.params.id);
     // body parser cant parse content of form bcos now its a multipart form...for that there is MULTER to read it(here uploadedAvatar())
     User.uploadedAvatar(req, res, function(err){
           if(err){console.log('*****Multer Error', err);}

          //  console.log(req.file);
          //  console.log(req.body);

           user.name = req.body.name;
           user.email = req.body.email;

           if(req.file){

               if(user.avatar){
                    // to delete the file
                    fs.unlinkSync( path.join(__dirname,'..',user.avatar))

               }
               // this is saving the path of uploaded file into avatar field in the user
               user.avatar = User.avatarPath + '/' + req.file.filename;
               // console.log(user.avatar)
           }
           user.save();
           req.flash('success', 'Successfully Updated');
           return res.redirect('back')
     })
   }catch(err){
      req.flash('error', err);
      return res.redirect('back');
   }


}else{
     req.flash('error', 'Unauthorized');
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
     // console.log(req.flash); 
     //   we can give anything instead of 'success'      
      req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
     // this logout() is given by passport
     req.logout(function(err){
          if(err){ console.log(err);}
          //   we can give anything instead of 'success'
     req.flash('success','You have logged out');

          return(res.redirect('/'));
     });  
    
}

