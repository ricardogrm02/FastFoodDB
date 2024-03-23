const express = require("express");
const router = express.Router();
const Customer = require("../../model/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Customer Login
// ⭐TODO

router.post("/register", async (req, res) => {
  // create a new user and add them to the schema
  try {
    const safePassword = await bcrypt.hash(req.body.password, 10);
    await Customer.create({
      userName: req.body.userName,
      email: req.body.email,
      password: safePassword,
      money: req.body.money,
    })
    res.status(200).send(`New Customer: ${req.body.userName} created!`);
  } catch(err) {
    res.status(400).send(`ERROR CREATING CUSTOMER: ${err}`)
  }
});

router.post("/login", async (req, res) => {
  // check if the user exists then log them in
  const customer = await Customer.findOne({
    email: req.body.email
  })

  if (!customer) {
    return res.status(404).send("Invalid Login");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    customer.password
  )

  if(validPassword) {
    const token = jwt.sign({
        userName: customer.userName,
        email: customer.email
      },
      'burgerKingLiterallySucks'
    )

    return res.status(201).json({userToken: token})
  } else {
    return res.status(401).json({userToken: false})
  }

});

router.post("/quote", async (req, res) => {
  // authorize the user
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try{
    const decoded = jwt.verify(token, 'burgerKingLiterallySucks')

    const customer = await Customer.findOne({
        email: decoded.email
    })

    if(!customer){
        return res.status(401).json({error:'Not a authorized User'})
    }

    await Customer.updateOne(
        {email: decoded.email},
        {$set: {quote: req.body.quote}}
        )
    
    return res.sendStatus(202)
  }catch(error){
    return res.status(403).send(`INVALID TOKEN: ${err}`)
  }
});

router.get("/products", async (req, res) => {
  // have the client get a list of the products
})

router.post("/pay", async (req, res) => {
  // authorize the user
});

module.exports = router;
