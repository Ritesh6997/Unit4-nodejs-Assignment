const express=require("express");
const app=express();
const Usercontroller=require("./controllers/usercontroller")
const productController = require("./controllers/product.controller")
const {Signup,login} = require("./controllers/auth.controller")
module.exports=app;
app.use(express.json());
app.post("/user",Usercontroller)

// app.use("/users", userController)

// app.post("/Signup", Signup)

// app.post("/login", login)

// app.use("/products", productController)

// app.listen(5000, async () => {
//     try{
//         await connect();
//         console.log("listening on port 5000")
//     }
//     catch(err){
//         console.log(err.message);
//     }
// });