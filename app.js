require('dotenv').config()
const express = require('express');
const connectDB = require('./database/connect');
const cors =require("cors")
const productRouter = require('./Routes/productRouter');

const userRouter=require('./Routes/userRoutes');
const shippingRouter = require('./Routes/shippingRouter');
const cartRouter = require('./Routes/addCartRouter');
const orderRouter = require('./Routes/orderRouter');
const paymentRouter = require('./Routes/paymentRouter');
const adminRouter = require('./Routes/adminRoutes');
const reviewRouter = require('./Routes/reviewRouter');
const whislistRouter = require('./Routes/whislistRouter');


const app = express()
app.use(cors())

const port = process.env.PORT;

connectDB()
app.use(express.json())
app.use('/api/v1',productRouter)
app.use('/api/v1',adminRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',shippingRouter)
app.use('/api/v1',cartRouter)
app.use('/api/v1',orderRouter)
app.use('/api/v1',paymentRouter)
app.use('/api/v1',reviewRouter)
app.use('/api/v1',whislistRouter)



app.get('/', (req, res)=>{
    res.status(200).send('Testing')
})   


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})