const express=require("express")

const router=express.Router()
const {getallproduct,getproductbyid}=require("../controller/productcontroller")

router.get("/",getallproduct)
router.get("/:id",getproductbyid)
module.exports=router