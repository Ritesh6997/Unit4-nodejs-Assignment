const express=require("express");
const router=express.Router();
const Submission =require("../model/submission")
router.get("topper",async(req,res)=>{
    try {
        const submission=await Submission.find().sort({"marks":-1}).limit(1).populate({
            path:"studentId"
        }).lean().exec();
        
    } catch (error) {
        return res.status(500).send({message:message.error})
    }
})

module.exports=router;