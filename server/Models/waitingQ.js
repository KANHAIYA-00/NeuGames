import mongoose from "mongoose";

const waitingQ = mongoose.Schema({
  SocketID: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});
const waiting = mongoose.model("waiting", waitingQ);
export default waiting;
