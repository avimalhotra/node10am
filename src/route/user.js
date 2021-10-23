const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).send("User Page")
});
router.get('/login',(req,res)=>{
    res.status(200).send("User Login")
});
router.get('/logout',(req,res)=>{
    res.status(200).send("User Logout")
});

module.exports=router;

