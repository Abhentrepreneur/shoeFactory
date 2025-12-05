const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());


const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);

const productRoute = require("./routes/product");
app.use("/api/products", productRoute);

const cartRoute = require("./routes/cart");
app.use("/api/cart", cartRoute);

const orderRoute = require("./routes/order");
app.use("/api/order", orderRoute);

const shoesRoute = require("./routes/shoes");
app.use("/api/shoes", shoesRoute);


app.get("/", (req, res) => {
  res.send("Backend is running");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
