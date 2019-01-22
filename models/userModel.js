var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  age: { type: Number, min: 1, max: 100, default: 15 },
  status: { type: String, enum: ["active", "pending"], require: true },
  created_date: { type: Date, default: Date.now }
});

var User = mongoose.model("users", userSchema);
module.exports = User;
