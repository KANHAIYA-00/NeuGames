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
import waiting from "./Models/waitingQ.js";

dotenv.config();

const port = process.env.PORT || 3000;
const ip = "192.168.90.62";
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
  })
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
ticTacToeNamespace.on("connection", (socket) => {
  socket.on("start", async (user) => {
    if (user.username) {
      try {
        const partner = await waiting.findOne();
        if (partner) {
          await waiting.deleteMany({ SocketID: partner.SocketID });
          ticTacToeNamespace.to(partner.SocketID).emit("paired", user);
          ticTacToeNamespace.to(socket.id).emit("paired", partner);
        } else {
          await waiting.create({
            SocketID: user.SocketID,
            username: user.username,
            avatar: user.avatar,
          });
        }
      } catch (err) {
        console.log(err);
      }
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
  socket.on("disconnect", async () => {
    try {
      const delResult = await waiting.deleteMany({ SocketID: socket.id });
      console.log(delResult);
    } catch (error) {
      console.error("Error deleting socket:", error);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at ${ip}:${port}`);
});
