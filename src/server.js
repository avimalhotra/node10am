const { query } = require('express');
const express=require('express');
require('dotenv').config();
const app=express();
const parseurl=require('parseurl');
const nunjucks=require('nunjucks');
const path=require("path");


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



let admin=require('./route/admin');
let user=require('./route/user');

app.use('/admin',admin);
app.use('/user',user);


app.use(express.static('src/public'));

nunjucks.configure(path.resolve(__dirname,'public'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
});

/* app.use((req,res,next)=>{
    console.log(`App starts at ${Date()}`);
    next();
}); */

/* app.use((req,res)=>{
    res.status(200).send("Hello Express js");           // write and end
}); */

app.use( (req, res, next)=> {
    if (!req.session.views) {
      req.session.views = {};
    }
  
    // get the url pathname
    var pathname = parseurl(req).pathname;
  
    // count the views
    req.session.views.pathname = (req.session.views.pathname || 0) + 1;
  
    next()
  })

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


//const data={name:"aaa",id:22};

app.get('/api',(req,res)=>{
    res.header('Access-Control-Allow-Origin',"*");
    return res.send(data);
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
app.post('/postform',(req,res)=>{
    console.log(req.body);
    //res.send(req.body);
    res.send(`hello ${req.body.email}`);
});

// wild card handler 
app.get('/**',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send("page not found ");
});


app.listen(process.env.PORT,()=>{
    console.log(`App running at http://127.0.0.1:${process.env.PORT}`);
});