const Comment = require('../models/comment');
const { findById } = require('../models/post');
const Post = require('../models/post');

module.exports.create = async function(req,res){
  try{

   let post = await Post.findById(req.body.post);
    if(post){        
       let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })

    post.comments.push(comment);
    post.save();
    req.flash('success', 'Comment created successfully');
    return res.redirect('back'); 
    }
  }catch(err){
    req.flash('error', err);
    return res.redirect('back');     
  }

}
   


module.exports.destroy = function(req,res){
    
    Comment.findById(req.params.id, function(err, comment){
       
        if(req.user.id == comment.user){

            let postId = comment.post;

            comment.remove();
            //  $pull ithoke mongoose provide cheyyunnathaan
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
              if(err){
                req.flash('error',err);
                return  res.redirect('back');
              }

             req.flash('success', 'Comment Deleted Successfully');
              
              return  res.redirect('back');
            })
        }else{
          req.flash('error', 'You are not allowed to deleteComment');

          return  res.redirect('back');
        }
    });
}
