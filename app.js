const express = require('express');
const connectDB = require('./database/connect');
const app = express()
const port = process.env.PORT || 5000;

connectDB()
app.get('/', (req, res)=>{
    res.status(200).send('Testing')
})

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`)
})