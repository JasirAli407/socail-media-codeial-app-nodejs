class PostComments {
  constructor(postId) {
    this.postId = postId,
     this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
     this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.data.comment);

          $(`#post-comments-${postId}`).prepend(newComment);
          
          new Noty({
            type: "success",
            theme: "mint",
            layout: "topRight",
            text: "Comment aaaaay!",
            timeout: 1500,
          }).show();

          pSelf.deleteComment($(" .delete-comment-button", newComment));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    return $(`<li id="comment-${comment._id}">
        <p>
            
            <small><a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a></small>
           
        ${comment.content}
        <br>
        <small>${comment.user.name}</small>

        <small>        
        <a href="/likes/toggle/?id=${comment._id}&type=Comment">0 Likes</a>  
        </small>
        
        </p>
    
    </li>`);
  }

  deleteComment(deleteLink) {
    deleteLink.click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: deleteLink.prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            type: "success",
            theme: "mint",
            layout: "topRight",
            text: "COmment Deleted aaaay!",
            timeout: 1500,
          }).show();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  }
}
