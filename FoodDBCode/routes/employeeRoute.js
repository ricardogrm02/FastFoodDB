const express = require("express");
const router = express.Router();
const Employee = require("../model/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Hours = require("../model/hours");

router.post("/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await Employee.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.status(200).send("Employee Added to the database");
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/login", async (req, res) => {
  const user = await Employee.find({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid Login" };
  }
  // console.log(user)

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123",
    );

    return res.json({ status: "Ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.post("/quote", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "secret123");

    const user = await Employee.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.json({ status: "error", error: "Not a user" });
    }

    await Employee.updateOne(
      { email: decoded.email },
      { $set: { quote: req.body.quote } },
    );

    return res.json({ status: "Ok" });
  } catch (err) {
    return res.json({ status: "error", error: "Invalid Token" });
  }
});

router.post("/clock-in", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token

  try {
    const decoded = jwt.verify(token, "secret123");
    const employee = await Employee.findOne({ email: decoded.email });

    if (!employee) {
      return res.json({ status: "error", error: "Invalid user" });
    }

    const newHours = new Hours({
      date: new Date(), // Record current date
      hours: req.body.hours,
      overtime: req.body.overtime,
    });

    // Associate hours with employee (assuming a relationship)
    newHours.employee = employee._id;

    await newHours.save();

    res.json({ status: "OK", message: "Hours logged successfully" });
  } catch (err) {
    return res.json({
      status: "error",
      error: "Invalid Token or clock-in error",
    });
  }
});

module.exports = router;
