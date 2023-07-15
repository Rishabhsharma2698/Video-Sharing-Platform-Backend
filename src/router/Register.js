const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtAuth=require("./jwtAuth.js")
require("../db/conn.js");
const User=require("../models/UserSchema.js");
const router=express.Router();




router.post("/register",async(req,res)=>{
    const {name,email,phone,profession,password}=req.body

     if(!name && !email && !phone && !profession && !password){
        return res.status(422).json({status: "Failed", message:"please filled the data properly"})
     }
     try{
         const userExist=await User.findOne({email:email})
         if(userExist){
            return res.status(422).json({ status: "Failed", message:"email already Exist"})
        }
        const newuser=new User({name,email,phone,profession,password});
        await newuser.save()
        res.status(201).json({status: "Success" , message:"user register successful"})
          }
      catch(err){
        res.send(err)

     }
   
})


module.exports=router;