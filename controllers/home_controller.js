const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
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
    
      

  
      // ith oru alternative way
  // res.headers({"Access-Control-Allow-Origin" : "*"})

  try{
        // CHANGE :: populate the likes of each post and comment

   let posts = await Post.find({})
    .sort('-createdAt')  // to sort latest one on top
    .populate("user")
    .populate({
      path: "comments",
      populate: 
       [ 'user', 'likes'   ]
      
      // ,
      //  populate: {
      //    path: 'likes'
      //  }
      
    })
    .populate('likes')
    ;

    // console.log('ithaan posts', posts)

    // for(post of posts){
    //   console.log(post.comments);
    // }

    // posts.forEach((dt)=>{
    //    console.log(dt.comments);
    //   dt.comments.forEach(async (comment)=>{
    //     console.log(comment)
    //     let user = await User.findOne({_id:comment.user});
    //     console.log(user);
    //     comment.user = user;
    //   })
    //   // console.log(dt.comments);
    // })

    // console.log('ithaan posts', posts)
  let users = await User.find({});

  return res.render("home", {
    title: "home",
    posts: posts,
    all_users: users,
  });

 }
 catch(err){ 
  return  console.log('Error', err);
 } 

};


// demo codes
// using then
// Post.find({}).populate('comments').then(function(){});

// using promise
//  let posts = Post.find({}).populate('comments').exec(function(){});
// posts.then();
