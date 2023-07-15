const express = require("express");
require("../db/conn.js");

const User=require("../models/UserSchema.js");

const Video = require("../models/VideoSchema.js");
const jwtAuth=require("./jwtAuth.js");
const router = express.Router();

router.post('/upload', jwtAuth, async (req, res) => {
    const userid = req.user._id;
    const {tittle,desc,imgUrl,videoUrl,category,visibility} = req.body;
    const data = new Video({
        userid:userid,
        tittle:tittle,
        desc:desc,
        imgUrl:imgUrl,
        videoUrl:videoUrl,
        category:category,
        visibility:visibility
    });
    try{
        const newVideo = await data.save();
        res.status(200).send("Video uploaded successfully")
    }
    catch(e){
        res.status(404).send("error")
    }
}); 


router.get("/home", async (req,res)=>{

try {
    const data = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(data);
  } catch (err) {
    res.send("error")
  }

})


router.post("/myvideos", jwtAuth, async (req,res)=>{
    const userid = req.user._id;
    const data = await Video.find({userid:userid});
   res.status(200).json(data);
})



module.exports = router;

