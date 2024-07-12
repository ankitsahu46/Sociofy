import mongoose, { Schema } from 'mongoose';

const notificationDataSchema = new Schema({
  category: String,
  gotByUserId: String,
  gotByUserName: String,
  gotByUserProfileImg: String,
  userId: String,
  body: String,
  otherData: {
    postId: String,
    postImg: String,
    comment: String,
  },
  date: Date,
})

export default mongoose.model('notifications', notificationDataSchema);