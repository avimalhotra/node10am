const events=require('events').EventEmitter;
let emitter=new events();

/* 
emitter.once("subscribe",(res,x)=>{
    console.log(` subscribed`);
});

emitter.on("login",(res,x)=>{
    console.log(`${res} login process done 1`);
    x.handled=true;
});
emitter.on("login",(res,x)=>{
    if(x.handled){
        console.log(`${res} login process done 2`)
    } 
}); */

//emitter.emit("login","avi",{user:"name"});

//emitter.emit("subscribe");
//emitter.emit("subscribe");


module.exports=emitter;

let login=require('./login');
let account=require('./account');

emitter.emit("login",9);
emitter.emit("account");