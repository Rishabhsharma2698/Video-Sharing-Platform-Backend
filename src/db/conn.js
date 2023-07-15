const dotenv = require('dotenv');
dotenv.config();
const mongoose=require("mongoose")

const connect = ()=>{
    mongoose.connect(process.env.DATABASE)
        .then(()=>{
            console.log("DataBase is Connected")
        })
        .catch((err)=>{
           console.log(err.message)
        })
    }

connect();