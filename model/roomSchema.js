const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
  },
  users: [{}],
  createBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
