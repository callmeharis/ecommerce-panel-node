const express=require("express")
const { addToWishlist, whishlistProduct } = require("../Controllers/whislistController")
const whislistRouter=express.Router()


whislistRouter.post("/createWhislist",addToWishlist)
whislistRouter.get("/whishlistProduct", whishlistProduct)


module.exports=whislistRouter