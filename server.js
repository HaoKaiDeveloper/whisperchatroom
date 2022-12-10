require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./db/connect");
const { Server } = require("socket.io");
const http = require("http");

const authenticateUser = require("./middleware/authenticate");
const userRouter = require("./routes/userRouter");
const roomRouter = require("./routes/roomRouter");
const messageRouter = require("./routes/messageRoute");

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/room", authenticateUser, roomRouter);
app.use("/api/message", authenticateUser, messageRouter);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

connect(process.env.MONGO_URL);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.roomId._id).emit("receive_message", data);
  });

  socket.on("leave_room", (data) => {
    socket.leave(data.roomId);
    socket
      .to(data.roomId)
      .emit("leave_roomMsg", {
        msg: "對方已離開聊天室，3秒後刪除...",
        roomId: data.roomId,
      });
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
