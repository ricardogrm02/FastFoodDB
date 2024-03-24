const mongoose = require('mongoose');
const express = require('express');

const customerRoutes = require('./routes/customer/customerRoute');
const reviewRoutes = require('./routes/customer/reviewRoute');
const employeeRoute = require('./routes/employeeRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();
app.use(express.json())

const dbURI = 'mongodb+srv://user123:secret123@fastfood.nhtvrjv.mongodb.net/?retryWrites=true&w=majority&appName=FastFood';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000, (req,res) => {
        console.log("Connected to DB and listening on port 3000 \nalt + click here to get redirected: http://localhost:3000");
    }))
    .catch((error) => console.log(error));
    
    app.use('/api/admin', adminRoute)
    app.use('/api/employee', employeeRoute)
    app.use('/api/customer', customerRoutes)
    app.use('/api/review', reviewRoutes)
