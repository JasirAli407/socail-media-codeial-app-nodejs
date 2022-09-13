const express = require('express');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
// used for session cookie 
const session = require('express-session'); 
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const MongoStore = require('connect-mongo'); 
const sassMiddleware = require('node-sass-middleware') ;
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const cors = require('cors')


app.use(cors({
    origin: '*'
}))

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000')

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    // debug: 'true',
    outputStyle: 'extended',
    prefix: '/css'
}))
// for reading through the post request
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));



app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract styles and scripts from subpages to layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
// console.log(app.set())
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,  // for session uninitialized
    resave: false,            // for unchanged session data
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // mongostore is used to store session cookie in the db
    store:  MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'

    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);




// use express router
app.use('/', require('./routes'));//by default it fetches index.js inside routes dir 

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
});