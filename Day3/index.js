const express=require("express");
const app=express();


app.use(logger2);
app.get("/books",(req,res)=>{
    res.send("this is me")
})
function logger2(req,res,next){
    next();
    console.log("Fecting all the books")
}
app.use(singleBook);
app.get("/book/:name",(req,res)=>{
    res.send({bookName:req.name});
})
function singleBook (req ,res,next){
    console.log("i am a logger before request");
    next();
    console.log("i am logger after next")
}
app.listen(5000,function () {
        console.log("listing to port 5000");
    })

app.get("/",(req,res)=>{
    res.send("you are on home page");
})