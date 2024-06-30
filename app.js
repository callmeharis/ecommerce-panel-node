const express = require('express');
const connectDB = require('./database/connect');
const productRouter = require('./Routes/productRouter');
const adminRouter = require('./Routes/adminRouter');
const app = express()
require('dotenv').config();

const port = process.env.PORT || 5000;

connectDB()
app.use(express.json())
app.use('/api/v1',productRouter)
app.use('/api/v1',adminRouter)

app.get('/', (req, res)=>{
    res.status(200).send('Testing')
})   

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`)
})