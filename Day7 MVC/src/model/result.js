const mongoose=require("mongoose");
const resultSchema= new mongoose.Schema({
    EvaluationId:{type:mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true},
    TotalMarks:{type:Number,required:true,default:0}
}) 

const Result = mongoose.model("results",resultSchema);
module.exports=Result;