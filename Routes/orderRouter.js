const express=require("express")
const { createOrder } = require("../Controllers/orderController")
const orderRouter=express.Router()



orderRouter.post("/createOrder", createOrder)

module.exports=orderRouter