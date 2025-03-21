import { Router } from "express";
import User from "../Models/user.js";
import bcrypt from "bcrypt";
import {
  ValidateUsername,
  ValidateEmail,
  ValidatePassword,
} from "../Functions/Validator.js";

const router = Router();

function validation(data) {
  const nameError = ValidateUsername(data.username);
  if (nameError) {
    return nameError;
  }
  const emailError = ValidateEmail(data.email);
  if (emailError) {
    return emailError;
  }
  const passwordError = ValidatePassword(data.password);
  if (passwordError) {
    return passwordError;
  }
  return true;
}

router.post("/", async (req, res) => {
  let { username, email, password, avatar } = req.body;
  const isValid = validation(req.body);
  if (isValid === true) {
    try {
      let Username = await User.findOne({ Username: username });
      let Email = await User.findOne({ Email: email });
      if (Username) {
        return res.status(400).json({ Message: "Username already taken." });
      }
      if (Email) {
        return res.status(400).json({ Message: "Email already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        Username: username,
        Email: email,
        Password: hashedPassword,
        Avatar: avatar,
      });
      res.status(201).json({ Message: "Account Created Successfully." });
    } catch (error) {
      res.status(500).json({ Message: "Something Went Wrong." });
    }
  } else {
    res.status(400).json({ Message: isValid });
  }
});

export default router;
