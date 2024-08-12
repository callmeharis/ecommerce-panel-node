const cartModel = require('../Models/addtoCartModel');
const Order = require('../Models/orderModel'); 
const Shipping = require('../Models/shippingModel');
const UserModel=require("../Models/userModel")
const transporter=require('../middleware/emailTransporter')





exports.createOrder = async (req, res) => {
    try {
        const { cartId, shippingId, email } = req.body;

        console.log(`cart id ${cartId}, shipping id ${shippingId}, email ${email}`)

        const cartDetails = await cartModel.findById(cartId).populate('products');
        const shippingDetails = await Shipping.findById(shippingId);

       
        const orders = [];
        for (const product of cartDetails.products) {
            const newOrder = new Order({
                cart: {
                    image: product.image,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    userId: cartDetails.userId,
                    productId: product.productId
                },
                shipping: {
                    country: shippingDetails.country,
                    state: shippingDetails.state,
                    city: shippingDetails.city,
                    street: shippingDetails.street,
                    phoneNumber: shippingDetails.phoneNumber,
                    userId: shippingDetails.userId
                },
                userId: shippingDetails.userId
            });
            orders.push(newOrder);
            await newOrder.save();
        }

        for (const order of orders) {
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
                           <li>Product Name: ${order.cart.name}</li>
                           <li>Product Price: ${order.cart.price}</li>
                           <li>Product Quantity: ${order.cart.quantity}</li>
                           <li>Shipping Address: ${order.shipping.street}, ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}</li>
                       </ul>`
            };

            await transporter.sendMail(mailOptions);
        }

        return res.status(201).json({
            success: true,
            message: "Order(s) created and confirmation email(s) sent successfully",
            orders: orders
        });
    } catch (error) {
        console.error("Error creating order and sending confirmation email:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



// exports.createOrder = async (req, res) => {
//     try {
//         const { cartId, shippingId } = req.body;

//         console.log(" card id"+cartId, "shpping"+shippingId);

//         const cartDetails = await cartModel.findById(cartId).populate('products');

//         const shippingDetails = await Shipping.findById(shippingId);

//         const orders = [];

//         console.log(cartDetails)

//         if (!cartDetails) return;

//         for (const product of cartDetails.products) {
//             const newOrder = new Order({
//                 cart: {
//                     image: product.image,
//                     description: product.description,
//                     price: product.price,
//                     quantity: product.quantity,
//                     userId: cartDetails.userId,
//                     productId: product.productId 
//                 },
//                 shipping: {
//                     country: shippingDetails.country,
//                     state: shippingDetails.state,
//                     city: shippingDetails.city,
//                     street: shippingDetails.street,
//                     phoneNumber: shippingDetails.phoneNumber,
//                     userId: shippingDetails.userId
//                 },
//                 userId: shippingDetails.userId
//             });
//             orders.push(newOrder);
//             await newOrder.save();
//         }

//         return res.status(201).json({
//             success: true,
//             message: "Order(s) created successfully",
//             orders: orders
//         });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };





// exports.confirmationEmail = async (req, res) => {
//     try {
//         const { orderId, email } = req.body;
//         console.log("order id is :",orderId)

//         const order = await Order.findById(orderId)

//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         const mailOptions = {
//             from: 'is170404123@gmail.com',
//             to: email, 
//             subject: 'Order Confirmation',
//             text: 'Your order has been placed successfully.',
//             html: `<p>Thank you for your order!</p>
//                    <p>Order Details:</p>
//                    <ul>
//                        <li>Order ID: ${order._id}</li>
//                        <li>Order Date: ${order.createdAt}</li>
//                        <li>Product Name:${order.cart.name},product Price${order.cart.price},Product Quantity${order.cart.quantity},</</</li>
//                        <li>Shipping Address: ${order.shipping.street}, ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}</li>
//                    </ul>`
//         };

//          transporter.sendMail(mailOptions,(error,info)=>{
//             if(error){
//                 return res.status(404).json({success:false,message:error.message})
//             }else{

//                 return res.status(200).json({ message: "Order confirmation email sent successfully" });
//             }
//         });

//     } catch (error) {
//         console.error("Error sending order confirmation email:", error);
//         return res.status(500).json({ message: "Failed to send order confirmation email", error: error.message });
//     }
// };

















// exports.createOrder= async (req, res) => {
//     try {
//         const { cartId, shippingId, email, orderId } = req.body;

        
//         const cartDetails = await cartModel.findById(cartId).populate('products');
//         if (!cartDetails) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

       
//         const shippingDetails = await Shipping.findById(shippingId);
//         if (!shippingDetails) {
//             return res.status(404).json({ message: "Shipping details not found" });
//         }
//         const order = await Order.findById(orderId)

//                 if (!order) {
//                     return res.status(404).json({ message: "Order not found" });
//                 }
      
//         const orders = [];
//         for (const product of cartDetails.products) {
//             const newOrder = new Order({
//                 cart: {
//                     image: product.image,
//                     description: product.description,
//                     price: product.price,
//                     quantity: product.quantity,
//                     userId: cartDetails.userId,
//                     productId: product._id
//                 },
//                 shipping: {
//                     country: shippingDetails.country,
//                     state: shippingDetails.state,
//                     city: shippingDetails.city,
//                     street: shippingDetails.street,
//                     phoneNumber: shippingDetails.phoneNumber,
//                     userId: shippingDetails.userId
//                 },
//                 userId: cartDetails.userId
//             });
//             orders.push(newOrder);
//             await newOrder.save();
//         }

//         const mailOptions = {
//                         from: 'is170404123@gmail.com',
//                         to: email, 
//                         subject: 'Order Confirmation',
//                         text: 'Your order has been placed successfully.',
//                         html: `<p>Thank you for your order!</p>
//                                <p>Order Details:</p>
//                                <ul>
//                                    <li>Order ID: ${order._id}</li>
//                                    <li>Order Date: ${order.createdAt}</li>
//                                    <li>Product Name:${order.cart.name},product Price${order.cart.price},Product Quantity${order.cart.quantity},</</</li>
//                                    <li>Shipping Address: ${order.shipping.street}, ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}</li>
//                                </ul>`
//                     };
            

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error("Error sending confirmation email:", error);
//                 return res.status(500).json({ success: false, message: "Order created, but failed to send confirmation email", error: error.message });
//             } else {
//                 console.log("Confirmation email sent:", info.response);
//                 return res.status(201).json({ 
//                     success: true, 
//                     message: "Order(s) created successfully and confirmation email sent",
//                     orders: orders 
//                 });
//             }
//         });

//     } catch (error) {
//         console.error("Error creating order and sending confirmation email:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };


