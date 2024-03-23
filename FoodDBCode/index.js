const mongoose = require('mongoose');
const express = require('express');

const customerRoutes = require('./routes/customer/customer');
const reviewRoutes = require('./routes/customer/review');
const blogRoutes = require('./routes/customerRoute');
const adminRoutes = require('./routes/adminRoute');

// const Blog = require('./model/blog')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('./model/user')
// const Admin = require('./model/admin')

const app = express();
app.use(express.json())

const dbURI = 'mongodb+srv://user123:secret123@fastfood.nhtvrjv.mongodb.net/?retryWrites=true&w=majority&appName=FastFood';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000, (req,res) => {
        console.log("Connected to DB and listening on port 3000");
    }))
    .catch((error) => console.log(error));

app.use('/blogs', blogRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/admin', adminRoutes)

