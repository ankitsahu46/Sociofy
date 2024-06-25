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
  datePosted: Date,
  usersSawThePost: [String],
})

export default mongoose.model('all_posts', postDataSchema);
// import mongoose, { Schema } from "mongoose";


// const postDataSchema = new Schema({
//   userId: Schema.Types.ObjectId,
//   username: String,
//   postImg: [String],
//   userImg: String,
//   likers: [Schema.Types.ObjectId],
//   comments_all: [
//     {
//       commenter_img: String,
//       commenter_user_id: Schema.Types.ObjectId,
//       commenter_username: String,
//       comment: String,
//     },
//   ],
//   shares: Number,
//   datePosted: Date,
//   usersSawThePost: [Schema.Types.ObjectId],
// })

// export default mongoose.model('all_posts', postDataSchema);