const { query } = require('express');
const express=require('express');
require('dotenv').config();
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

let admin=require('./route/admin');
let user=require('./route/user');

app.use('/admin',admin);
app.use('/user',user);


app.use(express.static('src/public'));

/* app.use((req,res,next)=>{
    console.log(`App starts at ${Date()}`);
    next();
}); */

/* app.use((req,res)=>{
    res.status(200).send("Hello Express js");           // write and end
}); */

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send("home page");
    //res.status(200).json({"name":"aaa"});
    //res.status(200).send(req.url);
    //res.status(200).send(req.method);
});

app.get('/login',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send("login page");
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