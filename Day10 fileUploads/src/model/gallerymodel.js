const mongoose=require("mongoose");
const gallerSchema= new mongoose.Schema({
    img:{type:File,required:true}
})