import { Router } from "express";
import User from "../Models/user.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.NeuGames;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const { username } = decoded;
      const user = await User.findOne({ Username: username });
      if (!user) {
        return res.status(404).json({ Message: "User not found" });
      }
      let userdata = {
        username: user.Username,
        email: user.Email,
        avatar: user.Avatar,
      };
      res.json(userdata);
    } catch (error) {
      res.status(401).json({ Message: "Something Went Wrong." });
    }
  } else {
    res.status(401).json({ Message: "Something Went Wrong." });
  }
});

export default router;
