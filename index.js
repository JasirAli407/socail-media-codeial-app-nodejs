const express = require('express');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();

app.use(express.static('./assets'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(expressLayouts);
// extract styles and scripts from subpages to layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));//by default it fetches index.js inside routes dir 

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
});