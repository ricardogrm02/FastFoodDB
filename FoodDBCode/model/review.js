const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userID: { type: Number, unique: true },
  },
  {
    collection: "review",
  },
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
