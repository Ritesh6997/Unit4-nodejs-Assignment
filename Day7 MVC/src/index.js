const { json } = require("express");
const express=require("express")
const app=express();
module.exports=app;
const evaluationController=require("./controller/evaluationController");
app.use(express.json());

app.use("evaluation",evaluationController);
