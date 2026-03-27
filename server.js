const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()
const connectdb=require("./config/db")
const productroutes=require("./routes/productroutes")
const autheroutes=require("./routes/Authroutes")
const cartroute=require("./routes/cartroutes")
const checkroute=require("./routes/checkoutroutes")
const orderRoutes=require("./routes/orderroute")
const allusers=require("./routes/userroutess")
const addproduct=require("./routes/addproduct")
const adminorder=require("./routes/adminordercontroller")
const updatepro=require("./routes/updateproduct")
const payment=require("./routes/paymentrouter")
const protect = require("./middleware/authMiddleware")
const verifyRoute = require("./routes/paymentverify");
const isAdmin = require("./middleware/adminmiddleware");


const app=express()
app.use(cors())
app.use(express.json())


connectdb()


app.use("/auth", autheroutes)
app.use("/cart",protect,cartroute)
app.use("/order", protect, checkroute);
app.use("/orders",protect, orderRoutes);
app.use("/users", protect, isAdmin, allusers)
app.use("/admin/products", addproduct)
app.use("/updatepro", protect, isAdmin, updatepro)
app.use("/all", protect, isAdmin, adminorder)
app.use("/payment",payment)
app.use("/payment/verify", protect, verifyRoute) 
app.get("/", (req,res)=>{
    res.send("EzBuy API Running")
})
app.use("/products", productroutes)
app.use("/images", express.static("images"))
const port=process.env.PORT

app.listen(port,()=>{
    console.log(`surver is running ${port}`)
})