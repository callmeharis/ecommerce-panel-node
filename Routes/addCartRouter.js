const express=require('express');
const cartRouter= express.Router();

const { cardCreate, deleteCard, updateCard, getAllCards } = require('../Controllers/addtoCartController');

cartRouter.post("/cardCreate/:userId/:productId", cardCreate)
cartRouter.delete("/deleteCard/:cardId/user/:userId",deleteCard)
cartRouter.patch('/updateQuantity/:userId/:cardId/:productId', updateCard );
cartRouter.get('/getAllCards/:userId', getAllCards)




module.exports= cartRouter;





// const express = require('express');
// const cartRouter = express.Router();

// const { cardCreate, deleteCard, updateCard } = require('../Controllers/addtoCartController');

// cartRouter.post("/cardCreate/:userId/:productId", cardCreate);
// cartRouter.delete("/deleteCard/:cardId", deleteCard);
// cartRouter.put('/updateQuantity/:cardId', updateCard);

// module.exports = cartRouter;