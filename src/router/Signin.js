const express=require("express");
const bcrypt=require("bcryptjs");
const jwtAuth=require("./jwtAuth.js")
require("../db/conn.js");
const User=require("../models/UserSchema.js");
const router=express.Router();


router.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"All fields are mandatory"})
        }
        const userLogin= await User.findOne({email:email});
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password)
               
            if(isMatch){
                const token= await userLogin.generateAuthToken();

                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+25892000000),
                    httpOnly:true
                });
            
                res.status(200).send({Token:token,userId:userLogin._id})
            }else{
                res.status(400).send({status:"Failed", message: "invalid password"});
            }
        }
        else{
            res.status(400).send("invalid email")
        }
     }catch(err){
        console.log(err)
    }
})


router.post("/logout",jwtAuth,async (req,res)=>{
    try{
        res.clearCookie("jwtoken");
        req.user.tokens=[];
        await req.user.save();
        res.status(200).send({msg:"logout succesfully",user:req.user});

    }catch(error){
        res.status(501).send({msg:"err in logout",error:error.message})
    }
})

module.exports=router;