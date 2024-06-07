// import express from "express";
// import authMiddelware from "../middelware/auth.js"
// import { placeOrder, userOrders, verifyOrder,listOrders, updateStatus } from "../controllers/orderController.js";

// const orderRouter = express.Router();

// orderRouter.post("/place", authMiddelware, placeOrder);
// orderRouter.post("/verify", verifyOrder)
// orderRouter.post("/userOrders", authMiddelware, userOrders)
// orderRouter.get("/list", listOrders)
// orderRouter.post("/status",updateStatus)
// export default orderRouter;

// routes/orderRoute.js
import express from "express";
import authMiddleware from "../middelware/auth.js";
import {
  // placeOrder,
  // userOrders,
  // verifyOrder,
  // listOrders,
  // updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/verify", verifyOrder);
// orderRouter.post("/userorders", authMiddleware, userOrders);
// orderRouter.get("/list", listOrders);
// orderRouter.post("/status", updateStatus);

export default orderRouter;
