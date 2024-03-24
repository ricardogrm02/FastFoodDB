const express = require("express");
const router = express.Router();
const Review = require("../../model/review");

// Customer Reviews

router.post("/createReview", async (req, res) => {
  // take the body and post a new review
  try {
    Review.create({
      rating: req.body.rating,
      title: req.body.title,
      description: req.body.description,
      userID: req.body.userID,
    });
    res.status(200).send("Review added to database");
  } catch (error) {
    res.json({ status: "Error", error: "Key/Value Error" });
  }
});

router.get("/findReview", async (req, res) => {
  // find the user id's reviews and return an array of each object
  const review = await Review.findOne({ userID: req.body.userID });
  try {
    await review.save();
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deleteReview", async (req, res) => {
  // find review and delete it
  try {
    const review = await Review.findOneAndDelete({ userID: req.body.userID });
    res.status(200).send("Sucessful Deleted Review");
  } catch (error) {
    res.status(200).send("Failed to Delete Review");
  }
});

router.patch("/editReview", async (req, res) => {
  // find review and edit it
  try {
    const review = await Review.findOneAndUpdate(
      { userID: req.body.userID },
      {
        $set: {
          rating: req.body.rating,
          title: req.body.title,
          description: req.body.description,
        },
      },
      { new: true },
    );
    if (!review) {
      res.status(404).send();
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
