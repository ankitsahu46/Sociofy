import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  name: String
});

export default mongoose.model('users', userDataSchema);