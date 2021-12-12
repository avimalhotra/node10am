const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Pin=new Schema({
    _id:mongoose.ObjectId,
    officeName:String,
    pincode:Number,
    taluk:String,
    districtName:String,
    stateName:String
},{collection:"pin"});

let pins=mongoose.model("pins",Pin);

module.exports=pins;