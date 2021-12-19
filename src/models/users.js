const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const User=new Schema({
    _id:mongoose.ObjectId,
    name: { type: String,  },
    password:{ type: String},
},{collection:"users"});

let users=mongoose.model("users",User);

module.exports=users;