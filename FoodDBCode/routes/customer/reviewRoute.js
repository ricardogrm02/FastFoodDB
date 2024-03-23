const express = require("express");
const router = express.Router();
const Review = require("../../model/review");

// Customer Reviews

router.post("/create", async (req, res) => {
  // take the body and post a new review
  try {
    Review.create({
      rating: req.body.rating,
      title: req.body.title,
      description: req.body.description,
      userID: req.body.userID,
    });
    res.status(200).send("Review added to database");
  } catch (err) {
    res.json({ status: "Error", error: "Key/Value Error" });
  }
  res.status(200).send("Worked");
});

router.get("/", async (req, res) => {
  // find the user id's reviews and return an array of each object
});

router.get("/:id", async (req, res) => {
  // find the user id's reviews and return an array of each object
});

router.delete("/:id", async (req, res) => {
  // find review and delete it
  try {
    Review.findByIdAndDelete(req.params.id);
    res.status(200).send("Sucessful Deleted Review");
  } catch {
    res.status(200).send("Failed to Delete Review");
  }
});

router.patch("/:id", async (req, res) => {
  // find review and edit it
});

module.exports = router;
