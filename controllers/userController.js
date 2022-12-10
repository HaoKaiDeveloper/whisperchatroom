const User = require("../model/userSchema");
const Room = require("../model/roomSchema");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
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

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "資料請填寫齊全" });
  }

  const emailCheck = await User.findOne({ email });
  if (emailCheck) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Email已有人使用" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashPassword });
  const Info = { username, email, _id: user._id, headerImg: user.headerImg };
  const createJwt = jwt.sign(Info, process.env.JWT_KEY, { expiresIn: "1y" });

  res.status(StatusCodes.OK).json({ user: Info, token: createJwt });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "資料請填寫齊全" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "認證錯誤" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "認證錯誤" });
  }

  const Info = {
    username: user.username,
    email,
    _id: user._id,
    headerImg: user.headerImg,
  };
  const createJwt = jwt.sign(Info, process.env.JWT_KEY, { expiresIn: "1d" });

  res.status(StatusCodes.OK).json({ user: Info, token: createJwt });
};

const uploadHeader = async (req, res) => {
  const { _id: userId } = req.user;
  const newUserId = new ObjectId(userId);

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "查無此用戶", success: false });
  }
  const rooms = await Room.find({
    "users._id": newUserId,
  });

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    const url = res.req.file.path;
    const tempUrl = url.slice(8);
    if (user.headerImg) {
      const path = `./uploads/${user.headerImg}`;
      fs.unlinkSync(path);
    }
    user.headerImg = tempUrl;
    await user.save();
    rooms.forEach(async (r) => {
      let newUser = r.users;
      let other = [];
      if (newUser.length > 1) {
        other = r.users.filter((u) => u._id.toString() !== userId);
      }
      newUser = [...other, user];
      await Room.findOneAndUpdate(
        { _id: r._id },
        { users: newUser },
        { new: true }
      );
    });

    res.json({ success: true, user });
  });
};

const updateUser = async (req, res) => {
  const { _id: userId } = req.user;
  const { username } = req.body;

  let user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ success: false });
  }
  user.username = username;
  await user.save();

  return res.status(StatusCodes.OK).json({ user, success: true });
};

module.exports = {
  register,
  login,
  uploadHeader,
  updateUser,
};
