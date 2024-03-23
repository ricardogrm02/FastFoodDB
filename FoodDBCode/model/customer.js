const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  money: {type: Number, required: true},
  quote: {type: String},
},{
  collection: 'Customer'
})

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
