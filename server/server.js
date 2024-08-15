// Server Setup
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth-route");
//admin route
const adminRoutes=require("./routes/admin-route")
// const errorMiddleware = require("./middlewere/error-validator");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoute");


dotenv.config(); // Load environment variables before using them
connectDB(); // Connect to the database

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(morgan("dev"));
app.use(express.json());

// Route Middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin",adminRoutes)
app.use("/api/v1/category", categoryRoutes);
  app.use("/api/v1/product", productRoutes);
// Error Middleware
// app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send({ msg: "send your application" });
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} on port ${PORT}`);
});
