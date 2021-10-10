let m1=require('./events');

m1.on("login",(time)=>{
    console.log((`login starts at ${time}`));
});
m1.on("login",()=>{
    console.log((`login done `));
});