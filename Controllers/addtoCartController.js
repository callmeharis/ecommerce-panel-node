const cartModel =require("../Models/addtoCartModel")
const productModel=require("../Models/productModel")
// const adminModel=require("../Models/adminModel")
const UserModel=require('../Models/userModel')


// exports.cardCreate = async (req, res) => {
//     const { userId,   productId} = req.params;
//       console.log("userId", userId)
  
//     const {  image,name, price ,quantity} = req.body;
//     try {
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "user not found" });
        
//       }
//       const product = await productModel.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//       const cardCreate = new cartModel({
      
//         image,
//         name,
//         price,
//         quantity,
//         userId: userId,
//         products: [productId],
//       });
//       await cardCreate .save();
//       user.products = cardCreate ._id;
      
//       await user.save()
  
//       return res
//         .status(201)
//         .json({
//           success: true,
//           message: "card created successfully",
//           cardCreate ,
//         });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "internal server error ", error  });
//     }
//   };
exports.cardCreate = async (req, res) => {
  const { userId, productId } = req.params;
  console.log("userId", userId);

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        products: [{
          productId: product._id,
          image: product.image,
          description: product.description,
          price: product.price,
        }]
      });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.status(200).json({ message: "Product removed from cart" });
      } else {
        cart.products.push({
          productId: product._id,
          image: product.image,
          description: product.description,
          price: product.price,
        });
      }
    }

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Cart created successfully",
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
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

  exports.getAllCards = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const cards = await cartModel.findOne({ userId }).populate('products');
      if (!cards) {
        return res.status(404).json({ message: "No cards found for this user" });
      }
  
      return res.status(200).json({ success: true,message: "Cards retrieved successfully", cards,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };