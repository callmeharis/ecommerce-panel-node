const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
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
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
});

const Shipping = mongoose.model('Shipping', shippingSchema);
module.exports = Shipping;