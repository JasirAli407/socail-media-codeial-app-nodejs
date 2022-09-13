const Comment = require('../models/comment');
const { findById } = require('../models/post');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

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
     
    comment = await comment.populate('user', `name email`);
    // console.log(comment)

    // commentsMailer.newComment(comment);
                        
    let job = queue.create('emails', comment).save(function(err){
      if(err){return console.log('Error in sending to the queue', err);}

      // console.log('job enqueued', job.id);
    })

    if(req.xhr){

      return res.status(200).json({
        data: {
          comment: comment
        },
        message: 'Comment Published!'
      });
    }
     
   
    
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

              if(req.xhr){
                return res.status(200).json({
                  data: {
                    comment_id: req.params.id
                  }
                })
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
