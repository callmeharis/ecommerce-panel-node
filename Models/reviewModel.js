const mongoose=require('mongoose')

const reviewSchema= new mongoose.Schema({
    rating:{
        type:String,
        require:true, 
        min: 1,
        max: 5
    },
    comment:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      
    }
})

const reviewModel=mongoose.model("Review", reviewSchema)
module.exports=reviewModel