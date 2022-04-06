const express=require("express");
const app =express();
Usercontroller=require("./controller/usercontroller");
admincontroller=require("./controller/admincontroller")
module.exports=app;

app.use(express.json());

app.use("/users",Usercontroller);
app.use("/admin",admincontroller)

