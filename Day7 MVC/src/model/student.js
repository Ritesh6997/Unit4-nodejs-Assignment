const mongoose=require("mongoose");

const studentSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    rollId:{type:String,required:true},
    currentBatch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
      },
});

const Student=mongoose.model("student",studentSchema);

module.exports=Student;