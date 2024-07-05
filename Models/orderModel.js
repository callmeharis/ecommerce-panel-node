const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cart: {
        type: {
            image: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
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
            products: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        },
        required: true
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
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
              
            }
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
