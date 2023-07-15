const dotenv = require('dotenv');
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 8080;

dotenv.config();
require("./db/conn.js")

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.use(require("./router/Upload.js"))
app.use(require("./router/Search.js"))
app.use(require("./router/Register.js"))
app.use(require("./router/Signin.js"));


const User=require("./models/UserSchema.js")
const Video = require("./models/VideoSchema.js")



const middleware=(req,res,next)=>{
    console.log("i am midddleware")
    next()
}

app.listen(PORT, (err) => {

     if (err) console.log(err);
    console.log(`Backend Server is running on Port ${PORT}`)
})

