const mongoose = require('mongoose');

// Define the Shoe schema
const shoeSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    size: Number,
    inStock: Boolean,
    stock: Number,
    thumbnail: String,
}, { timestamps: true });

// Create the Shoe model
const Shoe = mongoose.model('Shoe', shoeSchema, 'Shoe');


// Function to get all shoes
async function getAllShoes() {
    try {
        // console.log('shoes======>>>>>>', {...Shoe});
        const shoes = await Shoe.find();
        console.log(shoes);
        return shoes;
    } catch (error) {
        console.error('Error fetching shoes:', error);
        throw error;
    }
}

module.exports = { Shoe, getAllShoes };