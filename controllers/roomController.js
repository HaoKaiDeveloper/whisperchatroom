const Room = require("../model/roomSchema");
const User = require("../model/userSchema");
const Message = require("../model/messageSchema");
const { StatusCodes } = require("http-status-codes");
const ObjectId = require("mongodb").ObjectId;
const fs = require("fs");

const createRoom = async (req, res) => {
  const { _id: userId } = req.user;
  const { roomCode, createBy } = req.body;

  if (userId !== createBy) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "認證錯誤" });
  }
  const user = await User.findById(userId).select("-password");

  const createRoom = await Room.create({
    roomCode,
    createBy,
    users: [user],
    createBy,
  });

  res.status(StatusCodes.OK).json(createRoom);
};

const getAllRoom = async (req, res) => {
  const { _id: userId } = req.user;
  const newUserId = new ObjectId(userId);

  const rooms = await Room.find({
    users: { $elemMatch: { _id: newUserId } },
  });

  res.status(StatusCodes.OK).json(rooms);
};

const checkRoomExisted = async (req, res) => {
  const { roomId } = req.body;
  const { _id: userId } = req.user;

  const room = await Room.findById(roomId);
  let otherUser = {};
  if (room.users.length > 1) {
    const otherId = room.users.filter((u) => u._id.toString() !== userId)[0]
      ._id;
    otherUser = await User.findById(otherId.toString());
  }
  if (!room) {
    return res.status(StatusCodes.BAD_REQUEST).json({ exist: false });
  }
  return res.status(StatusCodes.OK).json({ room, otherUser });
};

const getSingleRoom = async (req, res) => {
  const { roomName } = req.query;

  const queryObject = {};
  if (roomName) {
    queryObject.roomCode = { $regex: roomName, $options: "i" };
  }
  const room = await Room.find(queryObject);

  const result = room.filter((room) => room.users.length === 1);

  res.status(StatusCodes.OK).json({ result, join: true });
};

const firstJoinTheRoom = async (req, res) => {
  const { roomId } = req.params;
  const { _id: userId } = req.user;

  const room = await Room.findById(roomId);
  const user = await User.findById(userId).select("-password");
  room.users.push(user);
  await room.save();

  if (!room || !user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ join: false });
  }

  return res.status(StatusCodes.OK).json({ room, join: true });
};

const deleteSingelRoom = async (req, res) => {
  const { roomId } = req.params;
  const { _id: userId } = req.user;
  console.log(roomId);

  const room = await Room.findOne({ _id: roomId });

  const user = room.users.find((user) => user._id.toString() === userId);
  if (!user || !room) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ success: false });
  }
  const allMessage = await Message.find({ roomId });
  allMessage.forEach((msg) => {
    if (msg.type === "image/jpeg") {
      const urlArr = msg.message.split("/");
      const url = urlArr[urlArr.length - 1];
      const path = `./uploads/${url}`;
      fs.unlinkSync(path);
    }
  });

  await Message.deleteMany({ roomId });
  room.delete();

  res.status(StatusCodes.OK).json({ success: true });
};

const deleteAllRoom = async (req, res) => {
  const { _id: userId } = req.user;
  const newUserId = new ObjectId(userId);

  const rooms = await Room.find({ "users._id": newUserId });
  rooms.forEach(async (r) => {
    const roomId = r._id.toString();
    const message = await Message.find({ roomId });
    message.forEach((msg) => {
      if (msg.type === "image/jpeg") {
        const urlArr = msg.message.split("/");
        const url = urlArr[urlArr.length - 1];
        const path = `./uploads/${url}`;
        fs.unlinkSync(path);
      }
    });
    await Message.deleteMany({ roomId });
  });
  await Room.deleteMany({ "users._id": newUserId });

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  createRoom,
  deleteSingelRoom,
  getAllRoom,
  firstJoinTheRoom,
  getSingleRoom,
  checkRoomExisted,
  deleteAllRoom,
};
