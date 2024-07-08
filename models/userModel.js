const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username must be less than 50 characters long'],
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
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        postalCode: {
            type: String,
            trim: true,
            match: [/^\d{5}(-\d{4})?$/, 'Postal code is not valid'] // Matches US ZIP code format
        }
    },
    phone: {
        type: String,
        required: false,
        match: [/^\d{10,15}$/, 'Phone number must be between 10 to 15 digits']
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    Shipping:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Shipping"
        
            }],
            reviews: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }],
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
