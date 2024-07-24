import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import Multer from 'multer';
import cors from 'cors';
import {
  addComment,
  checkLikedOrNot,
  deleteComment,
  getComments,
  getPosts,
  likeCount,
  incdecLikes,
  getPostData,
  postImg,
  getPostDataForHome,
  postSeenByUser,
  postShared,
  getUserPostData,
  fetchMorePostsForHome
} from "../controllers/index.js";


const router = express.Router();
router.use(cors());

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router
  .get("/", getPosts)
  .get("/see/:post_id", getPostData)
  .get('/like_count/:post_id', likeCount)
  .get("/get_comments/:post_id", getComments)
  .get("/get_post_data/:post_id", getPostData)
  .get('/shared/:post_id', verifyToken, postShared)
  .get('/get_user_post_data/:user_id', getUserPostData)
  .put("/likes/:post_id", incdecLikes)
  .put("/check_liked_or_not/:post_id", checkLikedOrNot)
  .post("/add_comment/:post_id", verifyToken, addComment)
  .post("/get_posts_for_home", verifyToken, getPostDataForHome)
  .post('/post_img', upload.single('img_file'), verifyToken, postImg)
  .post("/fetch_more_posts_for_home", verifyToken, fetchMorePostsForHome)
  .post('/post_seen_by_user/:post_id/:user_id', verifyToken, postSeenByUser)
  .delete("/delete_comment/:post_id/:comment_id", deleteComment)


export default router;
