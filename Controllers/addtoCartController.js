const cartModel =require("../Models/addtoCartModel")
const productModel=require("../Models/productModel")
// const adminModel=require("../Models/adminModel")
const UserModel=require('../Models/userModel')


exports.cardCreate = async (req, res) => {
    const { userId,   productId} = req.params;
      console.log("userId", userId)
  
    const {  image,name, price ,quantity} = req.body;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
        
      }
      const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
      const cardCreate = new cartModel({
      
        image,
        name,
        price,
        quantity,
        userId: userId,
        products: [productId],
      });
      await cardCreate .save();
      user.products = cardCreate ._id;
      
      await user.save()
  
      return res
        .status(201)
        .json({
          success: true,
          message: "card created successfully",
          cardCreate ,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error ", error  });
    }
  };




  exports.deleteCard= async (req, res) => {
    const { cardId, userId } = req.params;
    console.log(cardId, userId);

    try {
        const cart = await cartModel.findOne({userId});
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }

        const deleteCard = await cartModel.findByIdAndDelete(cardId);
        if (!deleteCard) {
            return res.status(404).json({ message: "card not found or not authorized to delete" });
        }

        return res.status(200).json({ message: "card  deleted" });
    } catch (error) {
        console.error("Error deleting card:", error);
        res.status(500).json({ message: "Error deleting card" });
    }
};
exports.updateCard = async (req, res) => {
    const { cardId, userId  } = req.params;
    const { quantity } = req.body;
  
    try {
      const user = await adminModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
  
      const cartItem = await cartModel.findOne({ userId ,cardId});
      if (!cartItem) {
        return res.status(404).json({ message: "Card item not found" });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      return res.status(200).json({
        success: true,
        message: "Card quantity updated successfully",
        cartItem,
      });
    } catch (error) {
      console.error("Error updating card quantity:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };








// const cartModel = require("../Models/addtoCartModel");
// const productModel = require("../Models/productModel");
// const UserModel = require('../Models/userModel');

// exports.cardCreate = async (req, res) => {
//     const { userId, productId } = req.params;
//     const { image, name, price, quantity } = req.body;

//     try {
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const product = await productModel.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         const cardCreate = new cartModel({
//             image,
//             name,
//             price,
//             quantity,
//             userId,
//             products: productId,
//         });

//         await cardCreate.save();
//         return res.status(201).json({ message: "Card created successfully", cardCreate });
//     } catch (error) {
//         console.error("Error creating card:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// exports.deleteCard = async (req, res) => {
//     const { cardId } = req.params;

//     try {
//         const deleteCard = await cartModel.findByIdAndDelete(cardId);
//         if (!deleteCard) {
//             return res.status(404).json({ message: "Card not found or not authorized to delete" });
//         }

//         return res.status(200).json({ message: "Card deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting card:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// exports.updateCard = async (req, res) => {
//     const { cardId } = req.params;
//     const { quantity } = req.body;

//     try {
//         const cartItem = await cartModel.findById(cardId);
//         if (!cartItem) {
//             return res.status(404).json({ message: "Card item not found" });
//         }

//         cartItem.quantity = quantity;
//         await cartItem.save();

//         return res.status(200).json({ message: "Card quantity updated successfully", cartItem });
//     } catch (error) {
//         console.error("Error updating card quantity:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };