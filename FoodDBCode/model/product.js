const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    productPrice: {type: Number, required: true},
    productId: {type: Number, required: true},
    calorieAmount: {type: Number, required: true},
    quote: {type: String}
}
)

const Product = new mongoose.model("Product", productSchema)

module.exports = Product