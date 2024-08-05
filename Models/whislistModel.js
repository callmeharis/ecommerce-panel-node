const mongoose = require('mongoose');

const whislistSchema = new mongoose.Schema({
    
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    
    },
    Products:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
    
});

const wishlistModel = mongoose.model('whislist', whislistSchema);

module.exports = wishlistModel;
