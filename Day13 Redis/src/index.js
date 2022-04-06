const express=require("express");
const app=express();
const productController=require("./controllers/productController")

app.use(express.json());

app.use("/product",productController);


module.exports=app;
