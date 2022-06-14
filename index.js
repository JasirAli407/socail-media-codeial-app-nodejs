const express = require('express');
const app = express();
const port = 8000;

app.use('/', require('./routes'));//by default it fetches index.js inside routes dir 

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
});