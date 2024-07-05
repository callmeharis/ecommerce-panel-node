const express = require("express");
const { paymentIntent } = require("../Controllers/paymentController");
// const asyncHandler=require('../middleware/asyncHandler')



const paymentRouter = express.Router()


paymentRouter.post('/paymentIntent', paymentIntent)

module.exports= paymentRouter;
