const router = require("express").Router();

const {
  getMessages,
  sendMessage,
  sendFile,
} = require("../controllers/messageController");

router.post("/sendMessage", sendMessage);
router.post("/getMessage", getMessages);
router.post("/sendFile/:roomId", sendFile);

module.exports = router;
