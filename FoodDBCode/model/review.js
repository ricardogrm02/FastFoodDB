const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  title: String,
  description: String,
  userID: Number,
},{
    collection: 'Customer'
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
