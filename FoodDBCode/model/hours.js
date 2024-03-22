const moongoes = require("mongoose");

const hoursSchema = new moongoes.Schema({
  hours: { type: Number, required: true },
});

const Hours = new moongoes.model("Hours", hoursSchema);

module.exports = Hours;
