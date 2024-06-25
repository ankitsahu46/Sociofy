import mongoose, { Schema } from "mongoose";
import postData from "./postData.js";

const userDataSchema = new Schema({
  email: String,
  username: String,
  password: String,
  name: String,
  img: String,
  bio: String,
  followers: [String],
  following: [String],
  posts: [{
    type: mongoose.Schema.Types.ObjectId, ref: postData,
  }],
});

export default mongoose.model("users", userDataSchema);
