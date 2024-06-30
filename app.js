require('dotenv').config()
const express = require('express');
const connectDB = require('./database/connect');
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');
const app = express()
const port = process.env.PORT;


connectDB()
app.use(express.json())
app.use('/api/v1', adminRouter)
app.use('/api/v1', userRouter)
app.get('/', (req, res) => {
    res.status(200).send('Testing')
})


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})