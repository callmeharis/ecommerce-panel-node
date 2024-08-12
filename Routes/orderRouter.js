const express=require("express")
const { createOrder, confirmationEmail } = require("../Controllers/orderController")
const orderRouter=express.Router()



orderRouter.post("/createOrder", createOrder)
// orderRouter.post("/confirmationEmail",confirmationEmail)

module.exports=orderRouter