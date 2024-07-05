const express=require("express")
const { createShipping } = require("../Controllers/shippingController")
const shippingRouter=express.Router()



shippingRouter.post("/createShipping/:userId",createShipping)

module.exports=shippingRouter