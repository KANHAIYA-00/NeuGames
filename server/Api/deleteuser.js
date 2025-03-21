import { Router } from "express";
import User from "../Models/user.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.NeuGames;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOneAndDelete({ Username: decoded.username });
      if (!user) {
        return res.status(404).json({ Message: "User not found" });
      }
      res.status(200).json({ Message: "Account successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Message: "Internal server error" });
    }
  } else {
    res.status(401).json({ Message: "Unauthorized" });
  }
});

export default router;
