const mongoose = require("mongoose");

// Creating a shema with mongoose

const carSchema = new mongoose.Schema({
  model: Number,
  make: String,
  colour: String,
  registrationNumber: String,
  previousOwners: Array,
  owner: String,
  address: String,
});

module.exports = mongoose.model("Car", carSchema);
