const express = require('express');
const router = express.Router();
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('../model/product')
const Employee = require('../model/employee')

router.post("/register", async (req, res) => {
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.status(200).send("Admin Added to the database")
    }
    catch(err){
       res.json({status: 'error', error: 'Duplicate email'})
    }
})

router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({
        email: req.body.email
    })

    if(!admin){
        return {status: 'error', error: 'Invalid Login'}
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        admin.password
    )

    if(isPasswordValid){
        const token = jwt.sign(
            {
                name: admin.name,
                email: admin.email
            },
            'secret123'
        )

        return res.json({status:'Ok', admin:token})
    }else{
        return res.json({status: 'error', admin: false})
    }

})


/*  productName: {type: String, required: true},
    productPrice: {type: Number, required: true, unique: true},
    productId: {type: Number, required: true},
    calorieAmount: {type: Number, required: true},*/
router.post("/create/product", async (req, res) => {
    try{
        await Product.create({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productId: req.body.productId,
            calorieAmount: req.body.calorieAmount
        })
        res.status(200).send("Added new product ot the database")
    }
    catch(err){
       res.json({status: 'error', error: 'could not post product to database'})
    }
})

router.get("/view/product", async (req, res) => {
    const productList = await Product.find({})
    try {
        res.status(200).send(productList)
    } catch (err) {
        res.status(500).json({status: 'error', error: "Could not retrieve product from the database"})
    }
})

router.delete('/delete/product/:productId', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ productId: req.params.productId });
        if (!product) {
            return res.status(404).send(); // Send 404 if no blog was found
        }
        res.send(`Successfuly deleted prodct: ${product}`); // Send deleted blog
    } catch (error) {
        res.status(500).send(error); // Send 500 if an error occurs
    }
});



router.get("/view/employee", async (req, res) => {
    const employeeList = await Employee.find({})
    try {
        res.status(200).send(employeeList)
    } catch (err) {
        res.status(500).json({status: 'error', error: "Could not retrieve employee from the database"})
    }
})

router.post("/create/employee", async (req, res) => {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    try{
        await Employee.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.status(200).send("Added new employee ot the database")
    }
    catch(err){
       res.json({status: 'error', error: 'could not post employee to database'})
    }
})

router.delete('/delete/employee/:email', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ email: req.params.email });
        if (!employee) {
            return res.status(404).send(); // Send 404 if no blog was found
        }
        res.send(`Successfuly deleted employee: ${employee}`); // Send deleted blog
    } catch (error) {
        res.status(500).send(error); // Send 500 if an error occurs
    }
});

router.post("/quote", async(req,res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    
    console.log(token)
    if (token == null) return res.sendStatus(401);

    try{
        const decoded = jwt.verify(token, 'secret123')

        const admin = await Admin.findOne({
            email: decoded.email
        })

        if(!admin){
            return res.json({status: 'error', error: 'Not a valid admin'})
        }

        await Admin.updateOne(
            {email: decoded.email},
            {$set: {quote: req.body.quote}}
        )

        return res.json({status: 'Ok'})
    }catch(err){
        return res.json({status: 'error', error: "Invalid Token"})
    }
})


module.exports = router;