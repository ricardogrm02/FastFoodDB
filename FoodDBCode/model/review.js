const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { Number, required: true },
    title: { String, required: true },
    description: { String, required: true },
    userID: { Number, unique: true },
  },
  {
    collection: "Customer",
  },
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
