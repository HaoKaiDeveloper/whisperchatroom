const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  headerImg: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
