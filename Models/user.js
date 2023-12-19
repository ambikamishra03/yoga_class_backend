const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  age: Number,
  gender: String,
  batch: String,
});

module.exports = mongoose.model("user", userSchema);
