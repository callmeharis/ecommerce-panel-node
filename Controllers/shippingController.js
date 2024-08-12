const Shipping=require('../Models/shippingModel')
// const adminModel=require("../Models/adminModel")
const userModel=require('../Models/userModel')   

exports.createShipping = async (req, res) => {
    const { userId } = req.params;
      console.log("userId", userId)   
  
    const { country, state, city,street,  phoneNumber} = req.body;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
        
      }
      const createShipping = new Shipping({
        country, state, city,street,  phoneNumber, userId
          
      });
      await createShipping.save();
      user.Shipping.push(createShipping._id);
      
      await user.save()
  
      return res
        .status(201)
        .json({
          success: true,
          message: "shipping card created successfully",
          createShipping,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error ", error  });
    }
  };
  