const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Car=new Schema({
    _id:mongoose.ObjectId,
    name: { type: String, required: true, unique: true, dropDups: true },
    brand:{ type: String, required: true},
    type:{ type: String, required: true},
    price:{ type: Number, required: true},
    fuel:{ type: String, required: true}
},{collection:"cars"});

let cars=mongoose.model("cars",Car);

module.exports=cars;