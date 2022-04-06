const express=require("express");
const AdminId=require("../model/admin");
const router=express.Router();
router.get("", async (req, res) => {
    try {
      const page = req.query.page || 1;
      const pagesize = req.query.pagesize || 10; // 30
      const skips=(page-1)*pagesize;
      const admin = await AdminId.find().skip(skips).limit(pagesize).lean().exec()
      return res.status(200).send(admin) // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: 'Something went wrong .. try again later' })
    }
  });


router.post("",async(req,res)=>{
    try {
        let count1=await AdminId.find().count().lean().exec();
        console.log(count1)
        if (count1>=1){
          return res.status(200).send("already present");
        }
        admin= await AdminId.create(req.body);
        return res.status(200).send({Admin:admin})
    } catch (error) {
        return res
        .status(500)
        .send({ message: 'Something went wrong .. try again later' })
    }
  })
  
  module.exports=router;