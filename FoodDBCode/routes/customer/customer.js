const express = require('express');
const router = express.Router();
const Customer = require('../../model/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Customer Login
// ⭐TODO

router.post("/register", async (req, res) => {
    // create a new user and add them to the schema
})

router.post('/login', async (req, res) => {
    // check if the user exists then log them in

})

router.post("/quote", async (req, res) => {
    // authorize the user
})

module.exports = router;