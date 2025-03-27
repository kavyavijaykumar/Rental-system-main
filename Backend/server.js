const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// ✅ Middleware (MUST BE ABOVE ROUTES)
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Allows form submissions
app.use(cors());

// ✅ Connect to Database
connectDB();

// ✅ Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
