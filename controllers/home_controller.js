const Post = require('../models/post');

module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for codeial!</h1>');    
    // res.cookie('user_id', 25);
    // console.log(req.cookies);   

    //  Post.find({},function(err,posts){
    //     if(err){return console.log('Error in finding posts');}
    //     return res.render('home', {
    //         title: 'home',
    //         posts : posts
    //     });
    //      })


    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
           return res.render('home', {
                    title: 'home',
                    posts : posts
                });

        });
   
}