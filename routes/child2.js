const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("Child2 route is displaying data for user: "+req.user.name)
})
router.get("/second",(req,res)=>{
    res.send("Child2 second route is displaying data for user: "+req.user.name)
})
module.exports=router;