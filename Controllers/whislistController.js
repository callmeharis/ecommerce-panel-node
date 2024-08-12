const wishlistModel=require('../Models/whislistModel')
const UserModel=require('../Models/userModel')
const productModel=require('../Models/productModel')




exports.addToWishlist = async (req, res) => {
    const { userId, productId } = req.params;

    console.log("data", userId, productId);

    try {
        const user = await UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let wishlist = await wishlistModel.findOne({userId})

        if(!wishlist){
            wishlist = new wishlistModel({
                userId,
                Products: productId
            })
            await wishlist.save()
        } else {
            const index = wishlist.Products.indexOf(productId);
            if (index !== -1) {
                wishlist.Products.splice(index, 1);
                return res.status(200).json({message: "product removed from whishlist"})
            } else {
                wishlist.Products.push(productId);
            }
            await wishlist.save();
        }
        return res.status(201).json({ message: "Product added to wishlist successfully", wishlist });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.whishlistProduct=async(req,res)=>{
    const {userId}=req.params;
    try {
        const user = await UserModel.findById(userId);
        if(!user){
            res.status(404).json({message:"user not found"})
        }
        const wishlist=await wishlistModel.findOne({userId}).populate('Products')
        if(!wishlist){
            res.status(404).json({message:"wishlist not found"})
        }
        return res.status(200).json({ message: "wishlist get successfully", wishlist });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error",error})
    }
}

