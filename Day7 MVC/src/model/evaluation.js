const mongoose=require("mongoose");

const evaluationSchema= new mongoose.Schema({
    studentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true,
      }],
    dateOfEvaluation:{type:String,required:true},
    batchId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
      }],
});


