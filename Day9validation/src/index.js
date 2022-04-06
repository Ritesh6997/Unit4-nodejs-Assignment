const express=require("express");
const app = express();
const usercontroller=require("./controller/user.controller");
app.use(express.json());
app.use("/users",usercontroller);
module.exports=app;
