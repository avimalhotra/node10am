const { query } = require('express');
const express=require('express');
require('dotenv').config();
const app=express();
const parseurl=require('parseurl');
const nunjucks=require('nunjucks');
const path=require("path");
const db=require('./dao');
const car=require('./models/car');
const pin=require('./models/pin');
const user=require('./models/users');
const bodyParser=require('body-parser');
//app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

const cookie=require('cookie-parser');
app.use(cookie());


const session=require('express-session');
app.set('trust proxy', 1); 
app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,maxAge:60000},
}));




db.on('error', function (err) { throw err }); 
db.once('open', function() {
   console.log('DB connected!');
});



let admin=require('./route/admin');
//let user=require('./route/user');


/* app.use((req,res,next)=>{
    console.log(`App starts at ${Date()}`);
     next();
}); */

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
app.use(express.static('src/public'));

nunjucks.configure(path.resolve(__dirname,'public'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser( (user, done)=> {
    done(null, user.id);
  });
passport.deserializeUser( (user, next)=> {
    next(null, user);
});

passport.use( new LocalStrategy({ usernameField: 'name',passwordField:'password' },(username, password, done) => {
    
    user.findOne({ name: username }, (err, user) => { 
        
      if (err) { return done(err); }
      if (!user) { return done(null, null, { message: 'No user found!' }); }
      if (user.password !== password) {
          
        return done(null, null, { message: 'Username or password is incorrect!' });
      }
      return done(null, user, null);
    });
  }
));
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).render('login.html',{msg:"Forbidden"});
    }
  }
 
app.get('/adminlogin', isAuthenticated, (req, res) => {  res.render('admin-login.html') });
app.get('/logout', (req, res) => { 
    if (req.session) {
        req.session.destroy((err)=> {
          if(err) {
            return next(err);
          } else {
              res.clearCookie('connect.sid');
              req.logout();
              if (!req.user) { 
                  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
              }
              res.render('login.html',{ msg:"Logout Successfully"});
          }
        });
      }
});

app.post("/postform",(req,res)=>{
    passport.authenticate('local', function (err, user, info) {
        
        if (err) {
          res.render('login.html', { error: err });
        } else if (!user) {
          res.render('login.html', { errorMessage: info.message });
        } else {
          //setting users in session
          req.logIn(user, function (err) {
            if (err) {
              res.render('login.html', { error: err });
            } else {
              res.render('admin-login.html',{ name:user.name});
              //res.redirect('/adminlogin')
            }
          })
        }
      })(req, res);
});


app.use( (req, res, next)=> {
    if (!req.session.views) {
      req.session.views = {};
    }
    // get the url pathname
    var pathname = parseurl(req).pathname;
    // count the views
    req.session.views.pathname = (req.session.views.pathname || 0) + 1;
    next()
  });

  const data=["sun","mon","tues","wed","thurs","fri","sat"];

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    //res.status(200).send("home page");
    //res.status(200).json({"name":"aaa"});
    //res.status(200).send(req.url);
    //res.status(200).send(req.method);
    //console.log(req.cookies.id,req.cookies.name,req.cookies.city);
    //res.cookie("name","avinash", {maxAge:86400, httpOnly: true});
    //res.status(200).send(req.cookies);
    //req.session.lang="en";
    //res.status(200).send(`id: ${req.sessionID}, lang: ${req.session.lang}, pageviews: ${req.session.views.pathname}`);
  
    res.render('home.html',{name:"Nunjucks", month:data, user:{name:"aaa",id:222}});

});



app.get('/api',(req,res)=>{
    res.header('Access-Control-Allow-Origin',"*");
    //return res.send(data);
    car.find({},(err,data)=>{
        if(err){ console.log(err); db.close()}
        else{
            if(data.length==0){ 
                return res.send("no data found");
                  }
            else{
                return res.send(data);
                
            }
        }
   });
});
app.get('/searchpin',(req,res)=>{
    pin.find({pincode:req.query.pin},(err,data)=>{
        if(err){ console.log(err); db.close()}
        else{
            if(data.length==0){ 
                 res.render('pincode.html',{nodata:"no Pincode found"});
            }
            else{
                res.render('pincode.html',{data:data});
                
            }
        }
   });
});
app.get('/pinapi',(req,res)=>{
    
    res.header('Access-Control-Allow-Origin',"*");

    pin.find({pincode:req.query.pin},(err,data)=>{
        if(err){ console.log(err); db.close()}
        else{

            return res.status(200).send(data)
        }
   });
});
app.post('/checkday',(req,res)=>{
    let day=req.body.day;                   // 0-6
    
    let dayname=data[day];
    
    //res.header('Access-Control-Allow-Origin',"*");
    
    return res.send(dayname);
});

app.get('/login',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    //res.status(200).send("login page");
    res.render('login.html',{name:"Login page", data:{id:212, login:new Date().toLocaleString()}});
});

app.get('/contact',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send("Contact page");
});
app.get('/car',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('car.html',{name:"Cars"});
});
app.get('/searchcar',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    let name=req.query.query;

    car.find({name:name},(err,data)=>{
        if(err){ console.log(err); db.close()}
        else{
            if(data.length==0){ 
                res.render('searchcar.html',{nodata:"No car found"});  
                 }
            else{
                res.render('searchcar.html',{data:data}); 
                
            }
        }
   });
    //res.status(200).render('searchcar.html',{name:"Cars"});
});
app.get('/search',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(req.query);
});
app.get('/brand/:brand/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(req.params);
});
app.get('/brand/:brand/:model/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(req.params);
});
app.get('/brand/:brand/:model/:variant',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(req.params);
});
app.get('/post',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send("Post page");
});


// get amd post form data
app.get('/getform',(req,res)=>{
    let search=req.query;
    res.status(200).send(`You searched : ${search.q}`);
});
/* app.post('/postform',(req,res)=>{
    console.log(req.body);
    //res.send(req.body);
    res.send(`hello ${req.body.email}`); 
}); */

// wild card handler 
app.get('/**',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send("page not found ");
});


app.listen(process.env.PORT,()=>{
    console.log(`App running at http://127.0.0.1:${process.env.PORT}`);
});