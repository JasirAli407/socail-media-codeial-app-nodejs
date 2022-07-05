const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
   // console.log(req.user);
   try{
      await Post.create({
        content: req.body.content,
        user: req.user._id,
      });

      return res.redirect("back");

   }catch(err){
   return console.log('Error', err);
   }   
  }
 


module.exports.destroy = async function (req, res) {  
try{
  let post =  await Post.findById(req.params.id);

  //  .id means converting the object ID into string
  if (post.user == req.user.id) {
    post.remove();

   await Comment.deleteMany({ post: req.params.id });
   return res.redirect("back");

  } else {
    return res.redirect("back");
  }
}catch(err){
  return console.log('Error', err);   
}
 
   
 
};
