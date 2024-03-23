const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hours: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hours" }],
    quote: { type: String },
  },
  {
    collection: "employees",
  },
);

const Employee = new mongoose.model("Employee", employeeSchema);

module.exports = Employee;
