const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const router = express.Router();

// PLACE ORDER
router.post("/place", async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod, cardInfo } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "User ID required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ msg: "Cart empty" });

    // calculate total
    let total = 0;
    const items = cart.items.map((item) => {
      total += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      };
    });

    // Add shipping cost
    const shippingCost = 50;
    const finalTotal = total + shippingCost;

    const orderData = {
      userId,
      items,
      totalAmount: finalTotal,
      subtotal: total,
      shippingCost: shippingCost,
      status: "pending",
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || "cod"
    };

    // Only store last 4 digits of card for security
    if (paymentMethod === "card" && cardInfo) {
      orderData.paymentInfo = {
        cardLast4: cardInfo.cardNumber ? cardInfo.cardNumber.slice(-4) : null,
        cardName: cardInfo.cardName || null
      };
    }

    const order = await Order.create(orderData);

    // clear cart
    cart.items = [];
    await cart.save();

    res.json({ msg: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("items.productId")
      .sort({ createdAt: -1 }); // Sort by newest first
    
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
