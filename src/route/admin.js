const express=require('express');

const router=express.Router();

// middleware specific to admin
router.use((req, res, next)=> {
    console.log('Admin login at: ',req.url, Date.now())
    next();
});

router.get('/',(req,res)=>{
    res.status(200).send("Admin Page")
});
router.get('/login',(req,res)=>{
    res.status(200).send("Admin Login")
});
router.get('/logout',(req,res)=>{
    res.status(200).send("Admin Logout")
});

module.exports=router;

