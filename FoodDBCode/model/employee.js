const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    quote: {type: String}
},{
    collection: 'users'
})
const employeeSchema = new mongoose.Schema({
    // ... other fields ...
    hours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hours' }] 
  });

const User = new mongoose.model("User", userSchema)
const Employee = new mongoose.model("Employee", employeeSchema)

module.exports = User
module.exports = Employee