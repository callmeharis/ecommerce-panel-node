const productModel = require("../Models/productModel");
const reviewModel=require("../Models/reviewModel")
const UserModel=require('../Models/userModel')

exports.createReview = async (req, res) => {
    const {  rating, comment } = req.body;
    const{productId, userId}=req.params

    console.log("product" + productId,"user"+ userId);

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const user= await UserModel.findById(userId);  
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const review = new reviewModel({
            product: product._id,
            user:user._id,
            rating,
            comment
        });

        await review.save();

          
        product.reviews.push(review._id);
        user.reviews.push(review._id);

        await product.save();
        await user.save()

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', error });
    }
};



exports.getAverageRating = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await productModel.findById(productId).populate('reviews');

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let totalRating = 0;
        if (product.reviews.length > 0) {
            totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
            totalRating /= product.reviews.length;
        }

        res.json({ averageRating: totalRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};