const express=require("express")
const routes=express.Router()
const {getallusers,getuserbyid,deleteuser,rolechanger}=require("../controller/userccontroller")

routes.get("/",getallusers)
routes.get("/:id",getuserbyid)
routes.put("/:id",rolechanger)
routes.delete("/:id",deleteuser)


module.exports=routes
