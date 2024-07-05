const cartModel = require('../Models/addtoCartModel');
const Order = require('../Models/orderModel'); 
const Shipping = require('../Models/shippingModel');

exports.createOrder = async (req, res) => {
    try {
        const { cartId, shippingId } = req.body;

        // Fetch cart details based on cartId
        const cartDetails = await cartModel.findById(cartId).populate('products').exec();

        // Fetch shipping details based on shippingId
        const shippingDetails = await Shipping.findById(shippingId).exec();

        // Create new Order document
        const newOrder = new Order({
            cart: {
                image: cartDetails.image,
                name: cartDetails.name,
                price: cartDetails.price,
                quantity: cartDetails.quantity,
                userId: cartDetails.userId,
                products: cartDetails.products
            },
            shipping: {
                country: shippingDetails.country,
                state: shippingDetails.state,
                city: shippingDetails.city,
                street: shippingDetails.street,
                phoneNumber: shippingDetails.phoneNumber,
                userId: shippingDetails.userId
            }
        });

        // Save the order to the database
        await newOrder.save();

        // Respond with success message
        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
