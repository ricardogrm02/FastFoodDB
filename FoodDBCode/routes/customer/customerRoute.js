const express = require("express");
const router = express.Router();
const Customer = require("../../model/customer");
const Menu = require("../../model/product")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Customer Login
// ⭐TODO

router.post("/register", async (req, res) => {
  // create a new user and add them to the schema
  try {
    const safePassword = await bcrypt.hash(req.body.password, 10);

    const existingCustomer = await Customer.findOne({ email: req.body.email });

    if (existingCustomer) {
      return res.status(400).send("Customer with the provided email already exists.");
    }
    
    await Customer.create({
      userName: req.body.userName,
      email: req.body.email,
      password: safePassword,
      money: req.body.money,
    })
    return res.status(200).send(`New Customer: ${req.body.userName} created!`);
  } catch(err) {
    return res.status(400).send(`ERROR CREATING CUSTOMER: ${err}`)
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
  }catch(err){
    return res.status(403).send(`INVALID TOKEN: ${err}`)
  }
});

router.get("/menu", async (req, res) => {
  // have the client get a list of the products
  const menu = await Menu.find();

  if (!menu) {
    return res.status(404).send("Unable to locate menu");
  }

  return res.status(200).json({menuItems: menu})
})


router.post("/pay", async (req, res) => {
  // authorize the user
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  try{
    const decoded = jwt.verify(token, 'burgerKingLiterallySucks')

    // Get the Customer
    const customer = await Customer.findOne({
        email: decoded.email
    })

    if(!customer){
        return res.status(401).json({error:'Not a authorized User'})
    }

    // Find MenuItem
    const menuItem = await Menu.findOne({
      productName: req.body.productName
    });

    if (!menuItem) {
      return res.status(404).json({error:"Cannot find menu item"});
    }

    // Check if customer has enough money
    
    const newAllowance = Math.round((customer.money - menuItem.productPrice) * 100) / 100;

    if (newAllowance < 0 ) {
      return res.status(406).json({error:'You\'re broke'})
    }

    // Make the purchase
    await Customer.updateOne(
      {email: decoded.email},
      {$set: {money: newAllowance}}
    )
    
    return res.status(202).json({msg: "Thank you for spending your money here instead of Burger King!"})
  }catch(err){
    return res.status(403).json({error: `INVALID TOKEN: ${err}`})
  }
});

router.post("/deposit", async (req, res) => {
  // authorize the user
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  try{
    const decoded = jwt.verify(token, 'burgerKingLiterallySucks')

    // Get the Customer
    const customer = await Customer.findOne({
        email: decoded.email
    })

    if(!customer){
        return res.status(401).json({error:'Not a authorized User'})
    }
    // Increase money allowance
    const newAllowance = customer.money + Number(req.body.money);

    await Customer.updateOne(
      {email: decoded.email},
      {$set: {money: newAllowance}}
    )
    
    return res.status(202).json({msg: "You are now less broke!"})
  }catch(err){
    return res.status(403).json({error: `INVALID TOKEN: ${err}`})
  }
});

module.exports = router;
