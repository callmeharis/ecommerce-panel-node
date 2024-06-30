require('dotenv').config()
const express = require('express');
const connectDB = require('./database/connect');
const productRouter = require('./Routes/productRouter');
const adminRouter = require('./Routes/adminRouter');
const userRouter=require('./Routes/userRoutes')
const app = express()
require('dotenv').config();

const port = process.env.PORT;

connectDB()
app.use(express.json())
app.use('/api/v1',productRouter)
app.use('/api/v1',adminRouter)
app.use('/api/v1',userRouter)

app.get('/', (req, res)=>{
    res.status(200).send('Testing')
})   


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})