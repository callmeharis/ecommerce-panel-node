const cartModel = require('../Models/addtoCartModel');
const Order = require('../Models/orderModel'); 
const Shipping = require('../Models/shippingModel');
const transporter=require('../middleware/emailTransporter')

exports.createOrder = async (req, res) => {
    try {
        const { cartId, shippingId } = req.body;

        const cartDetails = await cartModel.findById(cartId).populate('products').exec();

        const shippingDetails = await Shipping.findById(shippingId).exec();

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

        await newOrder.save();

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


exports.confirmationEmail = async (req, res) => {
    try {
        const { orderId, email } = req.body;

        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const mailOptions = {
            from: 'is170404123@gmail.com',
            to: email, 
            subject: 'Order Confirmation',
            text: 'Your order has been placed successfully.',
            html: `<p>Thank you for your order!</p>
                   <p>Order Details:</p>
                   <ul>
                       <li>Order ID: ${order._id}</li>
                       <li>Order Date: ${order.createdAt}</li>
                       <li>Product Name:${order.cart.name},product Price${order.cart.price},Product Quantity${order.cart.quantity},</</</li>
                       <li>Shipping Address: ${order.shipping.street}, ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}</li>
                   </ul>`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Order confirmation email sent successfully" });
    } catch (error) {
        console.error("Error sending order confirmation email:", error);
        return res.status(500).json({ message: "Failed to send order confirmation email", error: error.message });
    }
};





















