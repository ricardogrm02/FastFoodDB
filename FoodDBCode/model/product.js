const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    productPrice: {type: String, required: true, unique: true},
    productId: {type: Number, required: true},
    calorieAmount: {type: Number, required: true},
}
)

const Product = new mongoose.model("Product", productSchema)

module.exports = Product