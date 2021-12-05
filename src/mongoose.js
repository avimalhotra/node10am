
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/node', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;
const Schema=mongoose.Schema;

const Car=new Schema({
    _id:mongoose.ObjectId,
    name: { type: String, required: true, unique: true, dropDups: true },
    brand:{ type: String, required: true},
    type:{ type: String, required: true},
    price:{ type: Number, required: true},
    fuel:{ type: String, required: true}
},{collection:"cars"});

let model=mongoose.model("cars",Car);

/* let car=new model({
    _id:new mongoose.Types.ObjectId(),
    name:"vento",
    brand:"volkswagen",
    type:"sedan",
    price:1200000,
    fuel:"Petrol"
}); */


db.on('error', function (err) { throw err }); 
db.once('open', function callback() {
   console.log('connected!');
   //db.close();
    /* car.save((err,data)=>{
        if(err){
            console.log(err);
            db.close()
        }
        else{
            console.log(data.name,"saved in collection");
            db.close();
        }
   });  */

   model.find({type:"suv"},(err,data)=>{
        if(err){ console.log(err); db.close()}
        else{
            if(data.length==0){ 
                console.log("no record found");  
                db.close()  }
            else{
                console.log(data);
                db.close();
            }
        }
   });


});