const express=require('express');
const ip='127.0.0.1';
require('dotenv').config();



/* express().use((req,res)=>{
    res.end("Express JS");
}).listen(process.env.PORT); */

const app=express();
app.use(express.static('src/public'));

app.use((req,res,next)=>{
    console.log(`App starts at ${Date()}`);
    next();
});

app.use((req,res)=>{
    res.status(200).send("Hello Express js");
});

app.listen(process.env.PORT,ip,()=>{
    console.log(`App running at http://${ip}:${process.env.PORT}`);
});