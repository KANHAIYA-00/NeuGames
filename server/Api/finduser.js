import { Router } from "express";
import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ValidateUsername, ValidatePassword } from "../Functions/Validator.js";

const router = Router();

function validation(data) {
  const nameError = ValidateUsername(data.username);
  if (nameError) {
    return nameError;
  }
  const passwordError = ValidatePassword(data.password);
  if (passwordError) {
    return passwordError;
  }
  return true;
}

router.post("/", async (req, res) => {
  let { username, password } = req.body;
  const isValid = validation(req.body);
  if (isValid === true) {
    try {
      let user = await User.findOne({ Username: username });
      if (!user) {
        return res
          .status(404)
          .json({ Message: "Invalid username or password." });
      } else {
        let isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ Message: "Invalid username or password." });
        }
      }
      const token = jwt.sign(
        {
          id: user._id,
          username: user.Username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("NeuGames", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      });
      res.status(200).json({ Message: "Login successful." });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "Something Went Wrong." });
    }
  } else {
    res.status(400).json({ Message: isValid });
  }
});

export default router;
