const fs=require('fs');

//const data=fs.readFileSync('src/test.txt');
//console.log( data.toString() );

const data=fs.readFile('src/test.txt',{encoding:'utf8'},(err,data)=>{
    //(err)? console.log("Error"): console.log(data.toString());
    (err)? console.log("Error"): console.log(data);
});

console.log("done");