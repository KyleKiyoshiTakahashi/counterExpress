// express, ejs, session and body-parser have all been installed for this project.
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();

// express and session
// This sets up our views and static, as well as session
app.use(session({secret:'qwertywasd'}));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', "ejs");

// This deals with the first time a user loads the page
// with the first "if" statement, and every other load uses
// the "else"
app.get('/', function(req, res){
    if (req.session.times == null){
        req.session.times = 0;
        console.log(req.session.times)
    }
    else{
        req.session.times += 1;
        console.log(req.session.times)
    }
    res.render('counter', {times: req.session.times});
});

// We add only 1 to session since it redirects to "/"
// and there another 1 will be added, so to get 2,
// we only need to add 1 here
app.get('/addtwo', function(req,res){
    req.session.times += 1;
    res.redirect('/')
});


// will destroy the session count and return to 0
app.get('/reset', function(req,res){
    req.session.destroy();
    res.redirect('/')
});


app.listen(8000, function(){
    console.log('Listening on post number 8000...');
});
