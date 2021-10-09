const fs=require('fs');
const path=require("path");

//const data=fs.readFileSync('src/test.txt');
//console.log( data.toString() );

const data=fs.readFile([path.resolve('src/test.txt')],{encoding:'utf8'},(err,data)=>{
    //(err)? console.log("Error"): console.log(data.toString());
    if(err) {
        console.log("Error");
    }else{
        console.log(data);
    }
});

/* fs.stat('src/test.txt', (err, stats) => {
    if (err) {
      console.error(err)
    }
    else{
        console.log(stats.isFile());      // true
        console.log(stats.isDirectory());      // false
        console.log(stats.size);      // 1024
    }
  }); */

  /* fs.appendFileSync('src/test.txt',"write again \n",'utf8',(err)=>{
    if(err){
        console.log(err)
    }
}) */

/* try{
    fs.unlinkSync('src/test.txt');
    console.log('file deleted successfully');
}
catch(err){
    console.error("Error",err);
}
 */

console.log("done");