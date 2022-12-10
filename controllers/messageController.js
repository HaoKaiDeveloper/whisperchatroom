const Messages = require("../model/messageSchema");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

const getMessages = async (req, res) => {
  const { roomId } = req.body;

  const messages = await Messages.find({ roomId: roomId }).sort({
    createdAt: 1,
  });

  return res.status(StatusCodes.OK).json({ messages, success: true });
};

const sendMessage = async (req, res) => {
  const { message, to, from, type } = req.body;
  const data = await Messages.create({
    message: message,
    sender: from,
    roomId: to,
    type,
    createdAt: new Date(),
  });

  if (data) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
};

const sendFile = async (req, res) => {
  const { roomId } = req.params;
  const { _id: userId } = req.user;

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    } else {
      const url = res.req.file.path;
      const tempUrl = url.slice(8);

      await Messages.create({
        message: `/uploads/${tempUrl}`,
        sender: userId,
        roomId: roomId,
        type: res.req.file.mimetype,
        createdAt: new Date(),
      });

      res.json({ success: true, url: res.req.file.path });
    }
  });
};

module.exports = {
  getMessages,
  sendMessage,
  sendFile,
};
