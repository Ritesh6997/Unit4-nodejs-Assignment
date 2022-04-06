// User Schema
const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
    first_name: {type: String ,required: true},
    lastName:{type:String,required:true},
     gender:{type:String,required:true}, 
     dateOfBirth:{type:Date,required:true},
     type:{type:String,required:true}, 
    },{
        timestamps:true,
});
const User=mongoose.model("user",userSchema);
module.exports =User;