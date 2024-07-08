const express=require('express');
const { createReview, getAverageRating } = require('../Controllers/reviewController');
const reviewRouter= express.Router();


reviewRouter.post('/createReview/:producId/user/:userId', createReview);
reviewRouter.get('/getAverageRating/:productId', getAverageRating);



module.exports= reviewRouter;
