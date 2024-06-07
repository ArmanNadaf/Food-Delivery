// // import orderModel from "../models/orderModel.js";
// // import userModel from '../models/userModel.js';
// // import Stripe from "stripe";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // // Placing user order for frontend
// // const placeOrder = async (req, res) => {
// //     const frontend_url = "https://localhost:5173";
// //     try {
// //         const { userId, items, address, amount } = req.body;

// //         const newOrder = new orderModel({
// //             userId,
// //             items,
// //             amount,
// //             address
// //         });

// //         await newOrder.save();

// //         await userModel.findByIdAndUpdate(userId, { cartData: {} });

// //         const lineItems = items.map(item => ({
// //             price_data: {
// //                 currency: "inr",
// //                 product_data: {
// //                     name: item.name
// //                 },
// //                 unit_amount: item.price * 100
// //             },
// //             quantity: item.quantity
// //         }));

// //         lineItems.push({
// //             price_data: {
// //                 currency: "inr",
// //                 product_data: {
// //                     name: "Delivery Charges"
// //                 },
// //                 unit_amount: 200 * 100
// //             },
// //             quantity: 1
// //         });

// //         const session = await stripe.checkout.sessions.create({
// //             line_items: lineItems,
// //             mode: 'payment',
// //             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
// //             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
// //         });

// //         res.json({ success: true, session_url: session.url });
// //     } catch (error) {
// //         console.error("Error placing order:", error);
// //         res.status(500).json({ success: false, message: "Error placing order" });
// //     }
// // };

// // const verifyOrder = async (req, res) => {
// //     const { orderId, success } = req.body;
// //     try {
// //         if (success === "true") {
// //             await orderModel.findByIdAndUpdate(orderId, { payment: true });
// //             res.json({ success: true, message: "Paid" });
// //         } else {
// //             await orderModel.findByIdAndDelete(orderId);
// //             res.json({ success: false, message: "Not Paid" });
// //          }
// //     } catch (error) {
// //         console.log(error);
// //         res.json({ success: false, message: "Error" });
// //     }
// // };

// // // User orders for frontend
// // const userOrders = async (req, res) => {
// //     try {
// //         const orders = await orderModel.find({ userId: req.body.userId });
// //         res.json({ success: true, data: orders });
// //     } catch (error) {
// //         console.log(error);
// //         res.json({ success: false, message: "Error" });
// //     }
// // };

// // // Listing order for admin panel
// // const listOrders = async (req, res) => {
// //     try {
// //         const orders = await orderModel.find({});
// //         res.json({ success: true, data: orders });
// //     } catch (error) {
// //         console.log(error);
// //         res.json({ success: false, message: "Error" });
// //     }
// // };

// // // API for order status
// // const updateStatus = async (req, res) => {
// //     try {
// //         await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
// //         res.json({ success: true, message: "Status Updated" });
// //     } catch (error) {
// //         console.log(error);
// //         res.json({ success: false, message: "Error" });
// //     }
// // };

// // export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

// // controllers/orderController.js

// // Import necessary modules
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe";
// import jwt from "jsonwebtoken";

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Placing user order for frontend
// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5173"; // Corrected URL
//   try {
//     // Create a new order document
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });

//     // Save the new order to the database
//     await newOrder.save();

//     // Update the user's cart data to an empty object after placing the order
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     // Create line items for Stripe payment
//     const lineItems = req.body.items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100, // Assuming item.price is in INR
//       },
//       quantity: item.quantity,
//     }));

//     // Create a Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: lineItems,
//       success_url: `${frontend_url}/success?orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/cancel?orderId=${newOrder._id}`,
//     });

//     // Return the session URL to the client
//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ success: false, message: "Error placing order" });
//   }
// };

// // Verifying an Order
// const verifyOrder = async (req, res) => {
//   const { orderId, success } = req.body;
//   try {
//     if (success === "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       res.json({ success: true, message: "Paid" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Not Paid" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error" });
//   }
// };

// // Fetching User Orders
// const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.body.userId });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // Listing Orders
// const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error" });
//   }
// };

// // Updating Order Status
// const updateStatus = async (req, res) => {
//   try {
//     await orderModel.findByIdAndUpdate(req.body.orderId, {
//       status: req.body.status,
//     });
//     res.json({ success: true, message: "Status Updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error" });
//   }
// };

// // Add this function to handle checkout directly
// const checkout = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.name,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: "http://localhost:5173/success/",
//       cancel_url: "http://localhost:5173/cancel/",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Export all functions
// export {
//   placeOrder,
//   checkout,
//   verifyOrder,
//   userOrders,
//   listOrders,
//   updateStatus,
// };
