const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
   

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
        ref: "User"
    },
    products:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }


})
const cartModel = mongoose.model("Cart" , cartSchema)

module.exports= cartModel






// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     image: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         default: 1
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     products: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true
//     }
// });

// const cartModel = mongoose.model("Cart", cartSchema);

// module.exports = cartModel;
