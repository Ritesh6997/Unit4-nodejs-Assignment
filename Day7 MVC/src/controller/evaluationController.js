const express=require("express");
const router=express.Router();
const Evaluation=require("../model/evaluation")

router.get("/id",async(req,res)=>{
    try {
        const evaluation= await Evaluation.find(req.params.id).populate({
            path:"studentId",
        }).lean().exec();
        return res.status(200).send(evaluation);
    } catch (error) {
        return res.status(500).send({message:message.error})
    }
})



module.exports=router;