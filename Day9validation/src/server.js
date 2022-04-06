const app=require("./index");
const connect =require("./config/db");

app.listen(5000,async()=>{
    try {
        await connect();
    } catch (error) {
        console.log("Error:",error);
    }
    console.log("listing on port 5000")
})