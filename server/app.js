import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import createUser from "./Api/createuser.js";
import findUser from "./Api/finduser.js";
import getUser from "./Api/getuser.js";
import getGames from "./Api/getgames.js";
import deleteUser from "./Api/deleteuser.js";
import updateUser from "./Api/updateuser.js";
import connectDB from "./Database/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import deletecookie from "./Middlewares/deletecookie.js";
import authenticateToken from "./Middlewares/authenticate.js";
// import waiting from "./Models/waitingQ.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/check", authenticateToken);
app.post("/logout", deletecookie);

app.use("/api/create", createUser);
app.use("/api/finduser", findUser);
app.use("/api/user", getUser);
app.use("/api/games", getGames);
app.use("/api/delete", deleteUser);
app.use("/api/update", updateUser);

const ticTacToeNamespace = io.of("/Game/Tic-tac-toe");

// Store waiting players in-memory for instant matchmaking (No DB lag)
let waitingQueue = [];

ticTacToeNamespace.on("connection", (socket) => {
  socket.on("start", (user) => {
    if (!user.username) return;

    // 1. Safety check: Filter out any dead or stale queue entries from this user
    waitingQueue = waitingQueue.filter(
      (p) => p.username !== user.username && p.SocketID !== socket.id,
    );

    // 2. Check if another distinct opponent is waiting
    if (waitingQueue.length > 0) {
      const partner = waitingQueue.shift(); // Remove the opponent instantly from queue

      // Connect them
      ticTacToeNamespace
        .to(partner.SocketID)
        .emit("paired", { ...user, isPlayerX: false });
      ticTacToeNamespace
        .to(socket.id)
        .emit("paired", { ...partner, isPlayerX: true });
    } else {
      // 3. Queue is empty, safely add current player
      waitingQueue.push({
        SocketID: socket.id,
        username: user.username,
        avatar: user.avatar,
      });
    }
  });

  socket.on("change", (data, partner) => {
    ticTacToeNamespace.to(partner).emit("update", data);
  });

  socket.on("win", (winner, partner) => {
    ticTacToeNamespace.to(partner).emit("result", winner);
  });

  socket.on("draw", (partner) => {
    ticTacToeNamespace.to(partner).emit("result", "draw");
  });

  socket.on("disconnect", () => {
    // Instantly remove player from matchmaking array if they close tab or lag out
    waitingQueue = waitingQueue.filter(
      (player) => player.SocketID !== socket.id,
    );
  });
});

// const ticTacToeNamespace = io.of("/Game/Tic-tac-toe");
// ticTacToeNamespace.on("connection", (socket) => {
//   socket.on("start", async (user) => {
//     if (user.username) {
//       try {
//         const partner = await waiting.findOne();
//         if (partner) {
//           await waiting.deleteMany({ SocketID: partner.SocketID });
//           ticTacToeNamespace.to(partner.SocketID).emit("paired", user);
//           ticTacToeNamespace.to(socket.id).emit("paired", partner);
//         } else {
//           await waiting.create({
//             SocketID: user.SocketID,
//             username: user.username,
//             avatar: user.avatar,
//           });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   });
//   socket.on("change", (data, partner) => {
//     ticTacToeNamespace.to(partner).emit("update", data);
//   });
//   socket.on("win", (winner, partner) => {
//     ticTacToeNamespace.to(partner).emit("result", winner);
//   });
//   socket.on("draw", (partner) => {
//     ticTacToeNamespace.to(partner).emit("result", "draw");
//   });
//   socket.on("disconnect", async () => {
//     try {
//       const delResult = await waiting.deleteMany({ SocketID: socket.id });
//       console.log(delResult);
//     } catch (error) {
//       console.error("Error deleting socket:", error);
//     }
//   });
// });

server.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
