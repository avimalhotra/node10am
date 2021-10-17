const express=require('express');
require('dotenv').config();

const app=express();
//app.use(express.static('src/public'));


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
app.post('/post',(req,res)=>{
    res.send("post data");
});

// wild card handler 
app.get('/**',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send("page not found ");
});




app.listen(process.env.PORT,()=>{
    console.log(`App running at http://127.0.0.1:${process.env.PORT}`);
});