const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        require: false
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]

})
const adminModel = mongoose.model('Admin', AdminSchema)
module.exports = adminModel