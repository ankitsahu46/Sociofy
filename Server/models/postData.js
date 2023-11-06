import mongoose from 'mongoose';

const postDataSchema = new mongoose.Schema({
  postImg: String,
  userImg: String,
  username: String,
  likes: Number,
  comments: Number,
  shares: Number,
  commentsall: [{
      commenterimg: String,
      commenterusername: String,
  }]
})

export default mongoose.model('postdatas', postDataSchema);