import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    select: true,
  },
  Avatar: {
    type: String,
    required: false,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
