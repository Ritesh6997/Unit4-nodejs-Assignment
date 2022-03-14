const express =require("express")
const app=express();
app.get("/",function(req,res){
    return res.send({name:"Hello"});
})
app.get ("/books",function(req,res){
    res.send({Harry_potter:"J. K. Rowling",
             The_5am_club:"Robin Sharma",
             The_Secret:"Rhonda Byrne",
             You_can_win:"Shiv Khera"});
})

app.listen(4000,()=>{
    console.log("listening to 4000 port")
});

