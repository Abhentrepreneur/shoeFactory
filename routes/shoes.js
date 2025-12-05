// backend/routes/shoes.js
const router = require("express").Router();
const Shoe = require("../models/Shoe");

// Get all shoes
router.get("/", async (req, res) => {
  try {
    const shoes = await Shoe.getAllShoes();
    res.json(shoes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to fetch shoes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newShoe = new Shoe(req.body);
    const saved = await newShoe.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add shoe" });
  }
});

module.exports = router;
