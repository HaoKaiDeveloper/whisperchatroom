const router = require("express").Router();
const {
  createRoom,
  deleteSingelRoom,
  getAllRoom,
  firstJoinTheRoom,
  getSingleRoom,
  checkRoomExisted,
  deleteAllRoom,
} = require("../controllers/roomController");

router.post("/createRoom", createRoom);

router.delete("/deleteSingelRoom/:roomId", deleteSingelRoom);

router.delete("/deleteAllRoom", deleteAllRoom);

router.get("/getAllRooms", getAllRoom);

router.get("/searchRoom", getSingleRoom);

router.post("/checkRoomExisted", checkRoomExisted);

router.get("/firstJoinTheRoom/:roomId", firstJoinTheRoom);

module.exports = router;
