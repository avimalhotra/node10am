const os=require("os");

//console.log( os.arch() );

//console.log( os.cpus()[0] );
//console.log( os.cpus() );

//os.cpus().forEach((i)=>{ console.log(i);});

//console.log( os.totalmem()/(1024*1024), os.freemem()/(1024*1024));

//console.log(os.networkInterfaces());

console.log(os.platform());
console.log(os.type());
console.log(os.uptime()/3600);
console.log(os.userInfo());