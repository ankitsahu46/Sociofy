import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  email: String,
  password: String
});

export default mongoose.model('users', userDataSchema);