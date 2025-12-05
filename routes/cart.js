const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// ADD ITEM
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({ error: "userId and productId are required" });
    }
    
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const exists = cart.items.find(i => i.productId == productId);
      if (exists) {
        exists.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET CART
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    
    // If cart doesn't exist, return empty cart structure
    if (!cart) {
      return res.json({ items: [] });
    }
    
    // Filter out items where productId is null (deleted products)
    const validItems = cart.items.filter(item => item.productId !== null);
    
    // If all items are invalid, return empty cart
    if (validItems.length === 0) {
      return res.json({ items: [] });
    }
    
    // Update cart with valid items and return
    cart.items = validItems;
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: err.message });
  }
});

// REMOVE ITEM
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    cart.items = cart.items.filter(i => i.productId != productId);
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE QUANTITY
router.put("/update", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(i => i.productId == productId);
    if (item) item.quantity = quantity;

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
