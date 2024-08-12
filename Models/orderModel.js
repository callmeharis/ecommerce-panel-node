const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cart: {
            image: {
                type: String,
            },
            description: {
                type: String,
                required: true
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            
            },
            products:[ {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }]
    },
    shipping: {
        type: {
            country: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
        },
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
