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


const app=express()
app.use(cors())
app.use(express.json())

connectdb()


app.use("/auth", autheroutes)
app.use("/cart",cartroute)
app.use("/order",checkroute)
app.use("/orders", orderRoutes);
app.get("/", (req,res)=>{
    res.send("EzBuy API Running")
})
app.use("/products", productroutes)
app.use("/images", express.static("images"))
const port=process.env.PORT

app.listen(port,()=>{
    console.log(`surver is running ${port}`)
})