import mongoose, { Schema } from "mongoose";


const postDataSchema = new Schema({
  userId: String,
  username: String,
  postImg: [String],
  userImg: String,
  likers: [String],
  comments_all: [
    {
      commenter_img: String,
      commenter_user_id: String,
      commenter_username: String,
      comment: String,
    },
  ],
  shares: Number,
  caption: String,
  datePosted: Date,
  usersSawThePost: [String],
})

export default mongoose.model('all_posts', postDataSchema);