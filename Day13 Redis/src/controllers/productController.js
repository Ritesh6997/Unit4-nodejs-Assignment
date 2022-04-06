const express=require("express");
const router=express.Router();
const client=require("../configu/redis");
const Product=require("../model/Productmodel");

router.post("",async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        const products=await Product.find().lean().exec();
        client.set("products",JSON.stringify(products));
        client.set(`product${product._id}`,JSON.stringify(product));
        return res.status(200).send(products);
    }catch (error) {
       return res.status(500).send({
           messsage:error
       })
    }
})
router.get("",async(req,res)=>{
    try {
        client.get("products",async(err,fetchproducts)=>{
            if (fetchproducts){
                console.log(1)
                let data=JSON.parse(fetchproducts);
                const page = +(req.query.page) || 1;
                const pagesize = +(req.query.pagesize) || 10; // 30
                const skips=+((page-1)*pagesize);
                const products=[];
                let limit=pagesize+skips;
                for (let i=skips;i<limit;i++){
                    if (data[i]!=undefined){
                        console.log(1)
                        products.push(data[i]);
                    }
                }
                return res.status(200).send(products);
            }
            else{
                console.log(3)
                const products=await Product.find().lean().exec();
                client.set("products",JSON.stringify(products));
                return res.status(200).send(products);
            }
        })
    } catch (error) {
       return res.status(500).send({
           messsage:messsage.error
       })
    }
});

router.get("/:id",async(req,res)=>{
    try {
        client.get(`product${req.params.id}`,async(err,fetchproducts)=>{
            if (fetchproducts){
                return res.status(200).send(JSON.parse(fetchproducts));
            }
            else{
              const product=await Product.findById(req.body.id).lean().exec();
                client.set(`product${req.params.id}`,product);
                return res.status(200).send(product);
            }
        })
    } catch (error) {
        return res.status(500).send({
            messsage:messsage.error
        })
    }
});

router.patch("/:id",async(req,res)=>{
    try {
        try {
        const product =await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        const products=await Product.find().lean().exec();
        client.set("products",JSON.stringify(products));
        client.set(`product${req.params.id}`,JSON.stringify(product));
        return res.status(201).send(product);
        } catch (error) {
            return res.status(500).send({
                messsage:messsage.error
            }); 
        }
    } catch (error) {
        return res.status(500).send({
            messsage:messsage.error
        });
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        try {
            const product=await Product.findByIdAndDelete(req.params.id);
            const products=await Product.find().lean().exec();
            // client.del(`product${req.params.id}`);
            client.set("products",JSON.stringify(products));
            return res.status(200).send("deleted successfully")
        } catch (error) {
            return res.status(500).send({
                messsage:error
            });
        }
    } catch (error) {
        return res.status(500).send({
            messsage:error
        });
    }
})
module.exports=router;