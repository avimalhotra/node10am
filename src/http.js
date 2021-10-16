const server=require("http");
const fs=require('fs');
const { env } = require("process");
require('dotenv').config();

const app=server.createServer((req,res)=>{
    //res.statusCode=200;
    //res.setHeader('Content-Type','text/html');
    res.writeHead(200,{'Content-Type':'text/html'});
    // res.write(req.url + "<br>");
    // res.write(req.method + "<br>");
    // res.write(req.headers.host+  "<br>");
    // res.write("<h1>");
    // res.write("hello http server");
    // res.write("</h1>");
    // res.end();

    if( req.url=="/" && req.method=="GET"){
        fs.readFile("src/index.html",(err,data)=>{
            if(err){
                res.writeHead(404);
                res.write(err);
                res.end();
            }
            else{
                res.writeHead(200);
                res.write(data);
                res.end();
            }
        });
    }
    else{
        res.writeHead(404);
        res.end("Error");
    }

});

app.listen(process.env.PORT,()=>{
    console.log(`http server starts at http://127.0.0.1:${process.env.PORT}`);
});
