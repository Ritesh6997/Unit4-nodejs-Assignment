const mongoose=require("mongoose");

const adminIdSchema=new mongoose.Schema({
    adminId:[{type: mongoose.Schema.Types.ObjectId,
         ref: 'user', 
         required: true }]
});

const AdminId= mongoose.model("adminId",adminIdSchema);
 module.exports=AdminId;

