
const app=require("./index");


app.listen(5000,async()=>{
    try {
        await connect()
    } catch (error) {
        return res.status(500).send({message:message.error});
    }
})