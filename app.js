var express = require("express");
var app = express();
var path = require('path');
var con=require("./database");
var bodyParser = require("body-parser");
var fileUpload = require('express-fileupload');
var port_number = process.env.PORT || 3000;
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var jsonfile = require('jsonfile');
/*var file='./data/app_data.json';
if(typeof statistics == 'undefined')
{
    jsonfile.readFile(file, function(err, obj) {
        statistics=obj;
        console.log(obj[1].name);
    })
}*/
//console.log(statistics[0].name);
app.set("views", "./views");
app.set('view engine', 'pug');

var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(compression());
app.use(require("morgan")("combined", {stream: accessLogStream}));
app.use(fileUpload());
//app.use(serveStatic(__dirname + '/public'))
//app.use(express.static(__dirname + '/public'));
app.use('/public',express.static(path.join(__dirname, 'public')));
/*app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));
app.use('/contests/',express.static('public'));
app.use('/submit/',express.static('public'));
app.use('/leaderboard/',express.static('public'));*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession(
{
    secret:'dsjabfhsdfbhgfdgeffyfgvdfg',
    resave: true,
    saveUninitialized: true
})
);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(function(req, res, next){
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.error = err;
    if (msg) res.locals.message = msg;
    next();
});


app.get('/', function (req, res) {
    res.render("index", { title: "Landing Page", user_name: req.session.user_name});
});
app.get('/about', function (req, res) {
    res.render("aboutus", { title: "About Us", user_name: req.session.user_name});
});
app.get('/home', function (req, res) {
    res.render("home", { title: "Home", user_name: req.session.user_name});
});
app.get('/pricing', function (req, res) {
    res.render("pricing", { title: "Pricing", user_name: req.session.user_name});
});

/*app.get('/leaderboard', function (req, res) {
    res.redirect('/leaderboard/contests');
});
*/
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/home');
//    res.render("home", { title: "Home", user_name: req.session.user_name});
});


app.get('/download/:filename', function (req, res) {
    var filenm=req.params.filename;
    var file = __dirname + '/download/'+filenm;
    res.download(file);
});


app.post('/signup', function (req, res) {

    var data={firstname: req.body.firstname,lastname: req.body.lastname,email: req.body.email,password: req.body.password,sex: req.body.sex};
    //console.log(data);
    con.query('INSERT into users SET ?',data,function(err,rows){
       if(err) throw err;

       else 
       {
        req.session.success="You have been successfully registered";
        res.redirect('/signup');
        
    }
            //console.log(rows);
        });
    

 //   res.render("signup", { title: "Sign Up"});
   // res.end();
});

app.get('/signup', function (req, res) {
    if(req.session.user_name)
    {
        res.redirect('/home');
    }
    else
        res.render("signup", { title: "Sign Up",user_name: req.session.user_name});
});



app.get('/contact', function (req, res) {
    res.render("contact", { title: "Contact Us",user_name: req.session.user_name});
});

/*app.post('/contact', function (req, res) {
	var sentdata = { name: req.body.name,email: req.body.email,subject: req.body.subject,message: req.body.message };
    console.log(sentdata);
    var connection=con.query('INSERT INTO contactform SET ?', sentdata, function(err,res){
    	console.log(connection.sql);
  	
	});
    res.render("contact", { title: "Contact Us", formsentsuccess: "true"});
});*/
var submitRouter = require("./submit");
app.use("/submit", submitRouter);

var leaderboardRouter = require("./leaderboard");
app.use("/leaderboard", leaderboardRouter);

var loginRouter = require("./login");
app.use("/login", loginRouter);

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

var superadminRouter = require("./superadmin");
app.use("/superadmin", superadminRouter);

var submitRouter = require("./submitans");
app.use("/submitans", submitRouter);

var apiRouter = require("./api");
app.use("/api", apiRouter);

var contestRouter = require("./contests");
app.use("/contests", contestRouter);

var submissionRouter = require("./submissions");
app.use("/submissions", submissionRouter);

app.listen(port_number, function () {
    console.log('MlMachine app listening on port'+ port_number);
});

app.get('*',function (req, res) {
        res.status(404).render('nopage');
    });