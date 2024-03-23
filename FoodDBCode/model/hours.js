const moongoes = require("mongoose");

const hoursSchema = new moongoes.Schema({
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  overtime: { type: Number, required: true },
});

const Hours = new moongoes.model("Hours", hoursSchema);

module.exports = Hours;
