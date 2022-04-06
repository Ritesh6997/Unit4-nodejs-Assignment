const mongoose=require("mongoose");

const batchSchema= new mongoose.Schema({
    batch_name:{type: String,required: true,},},
    {
        timestamps:true,
    },
);
const Batch= mongoose.model("batch",batchSchema);