module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for codeial!</h1>');
    
    res.cookie('user_id', 25);
    console.log(req.cookies);   
    return res.render('home', {
        title: 'home'
    });
}