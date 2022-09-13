const nodemailer  = require('nodemailer');
const ejs = require('ejs');
const path = require('path')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    // we must authenticate so that gmail tracks the activity else anyone could use gmail to send mails  
    auth: {
        user: 'jasirali407@gmail.com',
        pass: 'avlnwwnhozzjbfss'
    }
});

// relativePath is from where mail is being send
let renderTemplate = (data, relativePath) => {

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){return console.log('Error in rendering template', err)}
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}