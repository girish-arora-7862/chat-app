const express = require("express");
const app = express();
const cors = require("cors");
const { registerUser, loginUser } = require("./users");
const { getRooms } = require("./rooms");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

socketIO.on("connection", (socket) => {

  socket.on("register", (data) => {
    const res = registerUser(data);
    socket.emit("resgisterResponse", res);
  });

  socket.on("login", (data) => {
    const res = loginUser(data);
    socket.emit("loginResponse", res);
  });

  socket.on("rooms", (data) => {
    const res = getRooms(data);
    socket.emit("roomsResponse", res);
  });

  socket.on("joinRoom", (data) => {
    socket.join(data.roomId);
  });

  socket.on("message", (data) => {
    socketIO.to(data.roomId).emit("newMessage", {
      username: data.username,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
