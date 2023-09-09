const express=require('express')
const passport = require('passport');
const auth = require("../reqauth.js");
const router=express.Router()
router.get("/",auth,(req,res)=>{
    res.render('dashboard.ejs',{name:req.user.name})
})

module.exports=router;