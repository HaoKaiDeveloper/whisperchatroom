const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("Message", messageSchema);
