import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  name: String,
  img: String,
  posts: [{
    postImg: [String],
    userImg: String,
    username: String,
    likes: Number,
    comments: Number,
    shares: Number,
    likers: [String],
    comments_all: [
      {
        commenter_img: String,
        commenter_username: String,
        comment: String,
      },
    ],
  }],
});

export default mongoose.model("users", userDataSchema);
