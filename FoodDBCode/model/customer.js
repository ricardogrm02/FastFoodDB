const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  title: String,
  description: String,
});

const Review = mongoose.model("BlogDB", reviewSchema);

module.exports = Review;
