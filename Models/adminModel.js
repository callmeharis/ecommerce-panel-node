const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username must be less than 50 characters long'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email is not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    phone: {
        type: String,
        required: false,
        match: [/^\d{10,15}$/, 'Phone number must be between 10 to 15 digits']
    },
    products:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],

});

const adminModel = mongoose.model('Admin', adminSchema);
module.exports =adminModel;
