const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) =>{
    //  console.log('inside new comment mailer');
    //  console.log(comment);
    
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    //  sendMail() is a predefined function
     nodeMailer.transporter.sendMail(
        {
            from: 'jasirali407@gmail.com',
            to: comment.user.email,
            subject: 'New Comment Pubished',
            html: htmlString
        },
            // info carry info about the req that has been sent
        (err,info)=>{
          if(err){return console.log("Error in sending the mail", err);}

        //   ivde return venenn nirbandhilla.. last alle
          // return console.log("mail Sent successfully", info);
        }
     );
}