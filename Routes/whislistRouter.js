const express=require("express")
const { addToWishlist, whishlistProduct } = require("../Controllers/whislistController")
const whislistRouter=express.Router()


whislistRouter.get("/createWhislist/:userId/:productId",addToWishlist)
whislistRouter.get("/whishlistProduct/:userId", whishlistProduct)

  
module.exports=whislistRouter    