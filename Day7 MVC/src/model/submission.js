const mongoose=require("mongoose");

const submissionSchema= new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true,
      },
      evaluationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "evaluation",
        required: true,
      },
    marks:{type:Number,required:true},
    
});
const Submission = mongoose.model("submission",submissionSchema);

module.exports=Submission;