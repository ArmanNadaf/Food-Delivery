// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import dotenv from 'dotenv'; // Corrected import statement
// import orderRouter from "./routes/orderRoute.js";

// // Load environment variables from .env file
// dotenv.config();

// // App config
// const app = express();
// const port = process.env.PORT || 4000; // Use PORT from environment or default to 4000

// // Middleware
// app.use(express.json());
// app.use(cors());

// // DB Connection
// connectDB();

// // API endpoints
// app.use("/api/food", foodRouter);
// app.use("/images", express.static('uploads'));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order",orderRouter)

// app.get('/', (req, res) => {
//     res.send("API working");
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// server.js
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRoute.js";

// Load environment variables from .env file
dotenv.config();

// App config
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

//   cashfree route

// const cashfreeRoute = require("./cashfreeRoute/cashfreeRoute.js");
// app.use("/api", cashfreeRoute);
