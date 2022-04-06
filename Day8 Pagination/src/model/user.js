const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    type:{type:String,required:true,default:"User"}
    },
    {
        timestamps:true,
        versionKey:false,
});
const User=mongoose.model("user",userSchema);
module.exports =User;