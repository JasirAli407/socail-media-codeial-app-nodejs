const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
             
// Every worker has a process(). 1st arg is typeof queue(name of queue as we wish)
queue.process('emails', function(job, done){
    // console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);

    done();
})