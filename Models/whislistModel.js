const mongoose = require('mongoose');

const whislistSchema = new mongoose.Schema({
    
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    
    },
    products:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }]
    
});

const wishlistModel = mongoose.model('whislist', whislistSchema);

module.exports = wishlistModel;
