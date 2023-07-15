const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    profession:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})



userSchema.pre("save",async function(next){

    if(this.isModified("password")){

        this.password=await bcrypt.hash(this.password,12);
    }
    next();

});


userSchema.methods.generateAuthToken=async function(){
    try{
     let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
     this.tokens=this.tokens.concat({token:token});
     await this.save()
     return token;
    }catch(err){
        console.log(err)
    }
}
const User=new mongoose.model("USER",userSchema);

module.exports=User;















//medatatiraju2018 username
//bWvoyIT5Zd6WThYq password
//mongodb+srv://medatatiraju2018:<password>@cluster0.enwlgpc.mongodb.net/?retryWrites=true&w=majority