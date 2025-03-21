import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    throw err;
  }
};
export default connectDB;
