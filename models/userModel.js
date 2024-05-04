const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    }, 
    password: {
      type: String,
      required: true
    },
    contact:{ }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
