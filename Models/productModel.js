const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

  Name:{
    type: String,
    required:true,
  } ,
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
      category: {
        type: String,
        required: true
      },
      
      adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
    reviews:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
  }],

})
const productModel = mongoose.model("Product" , productSchema)

module.exports= productModel
