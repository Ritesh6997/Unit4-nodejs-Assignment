const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    pic:{type:File,required:true}

});

const User= mongoose.model("user",userSchema)