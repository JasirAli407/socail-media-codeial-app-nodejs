{
  // method to submit the form using ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      // we manually submit using ajax(sending ajax request)
      $.ajax({
        type: "post",
        url: "/posts/create",
        // this converts the data into json form(serialize)
        data: newPostForm.serialize(),
        success: function (data) {
          // console.log(data);
          let newPost = newPostDom(data.data.post);
          // to sort latest one on topil veraan
          $("#posts-list-container>ul").prepend(newPost);
          // newPostile .delete-post-button class olla elmnt idkunnadh ingnen theres a space b4 writing class
          deletePost($(" .delete-post-button", newPost));
            
          // new PostComments(data.data.post._id);
          new Noty({
            type: 'success',
            theme: 'mint',     
            layout:'topRight', 
            text: 'Post Published',
            timeout: 1500
            
        }).show();

        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a post in DOM
  let newPostDom = function (post) {
    return $(` <li id="post-${post._id}">
        <p>
           
            <small><a class="delete-post-button" href="/posts/destroy/${post._id}">X</a></small>
           
             ${post.content}
        <br>
        <small>${post.user.name}</small>
        </p>
    
        
        <div id="post-comments">
           
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
    
           
               
              <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
               
                </ul>
                
              </div>
    
        </div>
        <br><br>
            
    </li> `);
  };

  // method to delete a post from DOM
  let deletePost = function (deleteLink) {
    // console.log(deleteLink)
    $(deleteLink).click(function (e) {
      e.preventDefault();
      //  console.log('click')
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          // console.log(data)
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  
let convertPostsToAjax = function(){
$('#posts-list-container>ul>li').each(function(){
  let deleteButton = $(' .delete-post-button', this);
  deletePost(deleteButton);

})

}
  

convertPostsToAjax()
  createPost();
}
