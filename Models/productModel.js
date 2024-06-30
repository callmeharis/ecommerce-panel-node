const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
   
    description: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      review: {
        type: String,
        required: true
      },
      adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }

})
const productModel = mongoose.model("Product" , productSchema)

module.exports= productModel
