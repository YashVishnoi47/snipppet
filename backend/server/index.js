const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
const server = http.createServer(app);

const UserInRoom = {};

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://collabrative-code-editor.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  },
  // transports: ['websocket'],
});

io.on("connection", (socket) => {
  socket.on("join_document", ({ roomId, username, userId, ownerId, owner }) => {
    const user = { socketId: socket.id, name: username, userId };
    if (!UserInRoom[roomId]) UserInRoom[roomId] = [];

    const isOwner = userId === ownerId;

    if (isOwner) {
      socket.join(roomId);
      UserInRoom[roomId].push(user);
      io.to(roomId).emit("users-in-room", UserInRoom[roomId]);
      console.log(`OWNER (${owner?.userName}) joined room: ${roomId}`);
    } else {
      const Owner = UserInRoom[roomId].find((u) => u.userId === ownerId);

      if (Owner) {
        io.to(Owner.socketId).emit("join_request", { user, roomId });
        console.log(`${username} requested to join room: ${roomId}`);
      } else {
        socket.emit("no_Owner", { reason: "Owner is not online." });
        console.log("Owner not online or not in the room.");
      }
    }

    console.log(`${user.name} Joined Room: ${roomId}`);
  });

  socket.on("join_request", ({ roomId, user, accepted }) => {
    if (accepted) {
      io.sockets.sockets.get(user.socketId)?.join(roomId);
      if (!UserInRoom[roomId]) UserInRoom[roomId] = [];
      UserInRoom[roomId].push(user);
      io.to(roomId).emit("users-in-room", UserInRoom[roomId]);
      // io.to(user.socketId).emit("load_page", { load: true });
      console.log(`${user.name} accepted into room: ${roomId}`);
    } else {
      io.to(user.socketId).emit("join_denied", {
        reason: "Request denied by owner.",
      });
      console.log(`${user.name} was denied access to room: ${roomId}`);
    }
  });

  socket.on("remove_user", ({ user, roomId }) => {
    if (user.socketId === socket.id) return;
    if (!UserInRoom[roomId]) return;
    console.log(`User Kicked: ${user.socketId} from Room: ${roomId}`);

    UserInRoom[roomId] = UserInRoom[roomId].filter(
      (user) => user.socketId !== socket.id
    );

    io.to(roomId).emit("users-in-room", UserInRoom[roomId]);

    io.to(user.socketId).emit("user_removed", {
      reason: "Owner removed you from the room.",
    });
  });

  socket.on("code-change", ({ roomId, code, file, lang }) => {
    // console.log("Code Change", { roomId, code, file, lang });
    socket.to(roomId).emit("changes", { code, file, lang });
  });

  socket.on("disconnect", () => {
    for (const roomId in UserInRoom) {
      console.log("User Disconnected", socket.id);
      UserInRoom[roomId] = UserInRoom[roomId].filter(
        (user) => user.socketId !== socket.id
      );
      io.to(roomId).emit("users-in-room", UserInRoom[roomId]);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
