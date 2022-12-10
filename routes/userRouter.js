const router = require("express").Router();

const {
  register,
  login,
  uploadHeader,
  updateUser,
} = require("../controllers/userController");

const authenticateUser = require("../middleware/authenticate");

router.post("/register", register);
router.post("/login", login);

router.post("/uploadHeader", authenticateUser, uploadHeader);
router.post("/updateUser", authenticateUser, updateUser);
module.exports = router;
