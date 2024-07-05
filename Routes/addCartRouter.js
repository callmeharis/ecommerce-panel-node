const express=require('express');
const cartRouter= express.Router();

const { cardCreate, deleteCard, updateCard } = require('../Controllers/addtoCartController');

cartRouter.post("/cardCreate/:userId/:productId", cardCreate)
cartRouter.delete("/deleteCard/:cardId/user/:userId",deleteCard)
cartRouter.put('/updateQuantity/:userId/:productId', updateCard );



module.exports= cartRouter;

// const express = require('express');
// const cartRouter = express.Router();

// const { cardCreate, deleteCard, updateCard } = require('../Controllers/addtoCartController');

// cartRouter.post("/cardCreate/:userId/:productId", cardCreate);
// cartRouter.delete("/deleteCard/:cardId", deleteCard);
// cartRouter.put('/updateQuantity/:cardId', updateCard);

// module.exports = cartRouter;