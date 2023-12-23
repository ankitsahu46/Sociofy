import mongoose from 'mongoose';

const postDataSchema = new mongoose.Schema({
  postImg: String,
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
  // commentsall: [{
  //     commenterimg: String,
  //     commenterusername: String,
  //     comment: String
  // }],
})

export default mongoose.model('all_posts', postDataSchema);